
package com.example.experiment8;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.header.Header;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.kafka.support.serializer.JsonDeserializer;

@RestController
@RequestMapping("/api/dlq")
public class DlqController {

    private static final String DLQ_TOPIC = "scheduled-posts-dlq";

    @GetMapping
    public ResponseEntity<?> getDeadLetterEvents() {
        Properties properties = new Properties();

        properties.put(
            ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
            "localhost:9092"
        );
        properties.put(
            ConsumerConfig.GROUP_ID_CONFIG,
            "dlq-viewer-" + UUID.randomUUID()
        );
        properties.put(
            ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
            StringDeserializer.class.getName()
        );
        properties.put(
            ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
            JsonDeserializer.class.getName()
        );
        properties.put(
            ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
            "earliest"
        );
        properties.put(
            ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG,
            false
        );
        properties.put(
            JsonDeserializer.VALUE_DEFAULT_TYPE,
            ScheduledPostEvent.class.getName()
        );
        properties.put(
            JsonDeserializer.TRUSTED_PACKAGES,
            "com.example.experiment8"
        );

        List<Map<String, Object>> events = new ArrayList<>();

        try (KafkaConsumer<String, ScheduledPostEvent> consumer =
                 new KafkaConsumer<>(properties)) {

            List<TopicPartition> partitions = consumer
                .partitionsFor(DLQ_TOPIC)
                .stream()
                .map(info -> new TopicPartition(
                    info.topic(),
                    info.partition()
                ))
                .toList();

            if (partitions.isEmpty()) {
                return ResponseEntity.ok(events);
            }

            consumer.assign(partitions);
            consumer.seekToBeginning(partitions);

            long deadline = System.currentTimeMillis() + 1500;

            while (System.currentTimeMillis() < deadline
                    && events.size() < 200) {

                ConsumerRecords<String, ScheduledPostEvent> records =
                    consumer.poll(Duration.ofMillis(250));

                for (ConsumerRecord<String, ScheduledPostEvent> record
                        : records) {

                    ScheduledPostEvent event = record.value();
                    Map<String, Object> item = new HashMap<>();

                    item.put(
                        "eventId",
                        event == null ? record.key() : event.getEventId()
                    );
                    item.put(
                        "content",
                        event == null ? "" : event.getContent()
                    );
                    item.put(
                        "simulateFailure",
                        event != null && event.isSimulateFailure()
                    );
                    item.put("topic", record.topic());
                    item.put("partition", record.partition());
                    item.put("offset", record.offset());
                    item.put("timestamp", record.timestamp());

                    Map<String, String> headers = new HashMap<>();

                    for (Header header : record.headers()) {
                        String name = header.key();

                        if (name.startsWith("kafka_dlt-")) {
                            headers.put(
                                name,
                                new String(
                                    header.value(),
                                    java.nio.charset.StandardCharsets.UTF_8
                                )
                            );
                        }
                    }

                    item.put("failureDetails", headers);
                    events.add(item);

                    if (events.size() >= 200) {
                        break;
                    }
                }
            }

            return ResponseEntity.ok(events);

        } catch (Exception exception) {
            Map<String, String> error = Map.of(
                "error", "Unable to read the dead-letter topic",
                "details", exception.getMessage() == null
                    ? "Unknown Kafka error"
                    : exception.getMessage()
            );

            return ResponseEntity.internalServerError().body(error);
        }
    }
}

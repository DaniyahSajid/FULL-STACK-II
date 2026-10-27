
package com.example.experiment8;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ScheduledPostProducer {

    private final KafkaTemplate<String, ScheduledPostEvent> kafkaTemplate;

    public ScheduledPostProducer(
            KafkaTemplate<String, ScheduledPostEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(ScheduledPostEvent event) {
        kafkaTemplate.send("scheduled-posts", event.getEventId(), event);
        System.out.println("Event sent to Kafka: " + event.getEventId());
    }
}

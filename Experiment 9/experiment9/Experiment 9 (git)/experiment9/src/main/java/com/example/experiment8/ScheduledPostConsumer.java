
package com.example.experiment8;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ScheduledPostConsumer {

    private final IdempotencyService idempotencyService;

    public ScheduledPostConsumer(IdempotencyService idempotencyService) {
        this.idempotencyService = idempotencyService;
    }

    @KafkaListener(topics = "scheduled-posts", groupId = "scheduled-posts-group")
    public void consume(ScheduledPostEvent event) {
        String eventId = event.getEventId();

        if (idempotencyService.isProcessed(eventId)) {
            System.out.println("Duplicate event skipped: " + eventId);
            return;
        }

        System.out.println("Processing event: " + eventId);

        if (event.isSimulateFailure()) {
            System.out.println("Simulated failure for event: " + eventId);
            throw new RuntimeException("Simulated processing failure");
        }

        idempotencyService.markAsProcessed(eventId);
        System.out.println("Event processed successfully: " + eventId);
    }
}

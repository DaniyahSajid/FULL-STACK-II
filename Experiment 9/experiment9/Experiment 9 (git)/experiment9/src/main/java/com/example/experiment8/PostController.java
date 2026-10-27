
package com.example.experiment8;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final ScheduledPostProducer producer;

    public PostController(ScheduledPostProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public ResponseEntity<ScheduledPostEvent> createPost(
            @RequestBody ScheduledPostEvent request) {

        String eventId = request.getEventId();

        if (eventId == null || eventId.isBlank()) {
            eventId = UUID.randomUUID().toString();
        }

        ScheduledPostEvent event = new ScheduledPostEvent(
                eventId,
                request.getContent(),
                request.isSimulateFailure()
        );

        producer.sendEvent(event);

        return ResponseEntity.accepted().body(event);
    }
}

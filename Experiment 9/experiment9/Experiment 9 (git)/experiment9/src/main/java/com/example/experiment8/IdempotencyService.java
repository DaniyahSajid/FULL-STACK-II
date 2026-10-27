
package com.example.experiment8;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class IdempotencyService {

    private final Set<String> processedEvents = ConcurrentHashMap.newKeySet();

    public boolean isProcessed(String eventId) {
        return processedEvents.contains(eventId);
    }

    public boolean markAsProcessed(String eventId) {
        return processedEvents.add(eventId);
    }

    public boolean tryMarkAsProcessed(String eventId) {
        return processedEvents.add(eventId);
    }
}

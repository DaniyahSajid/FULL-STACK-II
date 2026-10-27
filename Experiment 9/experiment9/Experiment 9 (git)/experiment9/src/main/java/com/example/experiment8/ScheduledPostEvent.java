
package com.example.experiment8;

public class ScheduledPostEvent {
    private String eventId;
    private String content;
    private boolean simulateFailure;

    public ScheduledPostEvent() {
    }

    public ScheduledPostEvent(String eventId, String content, boolean simulateFailure) {
        this.eventId = eventId;
        this.content = content;
        this.simulateFailure = simulateFailure;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isSimulateFailure() {
        return simulateFailure;
    }

    public void setSimulateFailure(boolean simulateFailure) {
        this.simulateFailure = simulateFailure;
    }
}

package com.e_learning.events;

import org.springframework.context.ApplicationEvent;

public class BadgeAwardedEvent extends ApplicationEvent {
    private final String badgeCode;
    private final Long userId;
    private final Long referenceId;
    public BadgeAwardedEvent(Object source, String badgeCode, Long userId, Long referenceId) {
        super(source);
        this.badgeCode = badgeCode;
        this.userId = userId;
        this.referenceId = referenceId;
    }

    public String getBadgeCode() {
        return badgeCode;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getReferenceId() {
        return referenceId;
    }
}

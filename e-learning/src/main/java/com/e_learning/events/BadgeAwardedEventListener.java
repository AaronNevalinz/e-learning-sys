package com.e_learning.events;

import com.e_learning.service.BadgeService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BadgeAwardedEventListener {
    private final BadgeService badgeService;
    public BadgeAwardedEventListener(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @EventListener
    public void handleBadgeAwardedEvent(BadgeAwardedEvent event) {
        badgeService.awardBadge(event.getBadgeCode(), event.getUserId(), event.getReferenceId());
    }
}

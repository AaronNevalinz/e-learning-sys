package com.e_learning.service;

import com.e_learning.model.Badge;
import com.e_learning.model.UserBadge;
import com.e_learning.repository.BadgeRepository;
import com.e_learning.repository.UserBadgeRepository;
import org.springframework.stereotype.Service;

@Service
public class BadgeService {
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    public BadgeService(BadgeRepository badgeRepository, UserBadgeRepository userBadgeRepository) {
        this.userBadgeRepository = userBadgeRepository;
        this.badgeRepository = badgeRepository;
    }

    public void awardBadge(String badgeCode, Long userId, Long referenceId) {
        Badge badge = badgeRepository.findByCode(badgeCode).orElseThrow(()->new RuntimeException("Badge not found"));

        boolean alreadyAwarded = userBadgeRepository.existsByUserIdAndBadgeAndReferenceId(userId, badge, referenceId);
        if (alreadyAwarded) return;

        UserBadge userBadge = new UserBadge();
        userBadge.setUserId(userId);
        userBadge.setReferenceId(referenceId);
        userBadge.setBadge(badge);

        userBadgeRepository.save(userBadge);
    }

    public Badge saveBadge(Badge badge) {
        return badgeRepository.save(badge);
    }
}
package com.e_learning.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_learning.model.Badge;
import com.e_learning.model.UserBadge;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    boolean existsByUserIdAndBadgeAndReferenceId(Long userId, Badge badge, Long referenceId);

    List<UserBadge> findByUserId(Long userId);

    Optional<UserBadge> findByUserIdAndBadgeCodeAndReferenceId(Long id, String courseCompletion, Long id1);

    List<UserBadge> findByUserIdAndReferenceIdIn(Long userId, List<Long> referenceIds);

}
package com.e_learning.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class UserBadge {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Badge badge;

    private Long userId;

    private Long referenceId;

    private LocalDateTime awardedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Badge getBadge() {
        return badge;
    }

    public void setBadge(Badge badge) {
        this.badge = badge;
    }



    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(Long referenceId) {
        this.referenceId = referenceId;
    }


    public LocalDateTime getAwardedAt() {
        return awardedAt;
    }

    public void setAwardedAt(LocalDateTime awardedAt) {
        this.awardedAt = awardedAt;
    }
}

package com.e_learning.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class UserTopicProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Topic topic;

    private boolean completed = false;

    private LocalDateTime completedAt;

    // Getters & Setters

    public UserTopicProgress() {
    }

    public UserTopicProgress(Long id, User user, Topic topic, boolean completed, LocalDateTime completedAt) {
        this.id = id;
        this.user = user;
        this.topic = topic;
        this.completed = completed;
        this.completedAt = completedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}


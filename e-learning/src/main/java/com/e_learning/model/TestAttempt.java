package com.e_learning.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class TestAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Topic topic;

    private double score;

    private boolean passed;

    private LocalDateTime submittedAt;

    @OneToMany(mappedBy = "testAttempt", cascade = CascadeType.ALL)
    private List<TestSubmission> submissions = new ArrayList<>();

    public TestAttempt() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
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

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public List<TestSubmission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<TestSubmission> submissions) {
        this.submissions = submissions;
    }
}

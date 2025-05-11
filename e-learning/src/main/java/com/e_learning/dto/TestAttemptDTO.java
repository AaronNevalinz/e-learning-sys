package com.e_learning.dto;

import java.time.LocalDateTime;

public class TestAttemptDTO {
    private Long id;
    private String topicTitle;
    private double score;
    private boolean passed;
    private LocalDateTime submittedAt;

    public TestAttemptDTO(Long id, String topicTitle, double score, boolean passed, LocalDateTime submittedAt) {
        this.id = id;
        this.topicTitle = topicTitle;
        this.score = score;
        this.passed = passed;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
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
}


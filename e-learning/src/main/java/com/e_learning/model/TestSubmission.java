package com.e_learning.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

// === TestSubmission.java ===

@Entity
public class TestSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private TestAttempt testAttempt;

    @ManyToOne(optional = false)
    private Question question;

    private Long selectedAnswerId;
    private boolean correct;
    private double score;

    public TestSubmission() {
    }

    public TestSubmission(Long id, TestAttempt testAttempt, Question question, Long selectedAnswerId, boolean correct, double score) {
        this.id = id;
        this.testAttempt = testAttempt;
        this.question = question;
        this.selectedAnswerId = selectedAnswerId;
        this.correct = correct;
        this.score = score;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestAttempt getTestAttempt() {
        return testAttempt;
    }

    public void setTestAttempt(TestAttempt testAttempt) {
        this.testAttempt = testAttempt;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Long getSelectedAnswerId() {
        return selectedAnswerId;
    }

    public void setSelectedAnswerId(Long selectedAnswerId) {
        this.selectedAnswerId = selectedAnswerId;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}

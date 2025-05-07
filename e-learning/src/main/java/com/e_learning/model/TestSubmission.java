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

    private String selectedAnswer; // user-chosen option
    private boolean correct;
    private double score;

    public TestSubmission() {
    }

    public TestSubmission(Long id, TestAttempt testAttempt, Question question, String selectedAnswer, boolean correct, double score) {
        this.id = id;
        this.testAttempt = testAttempt;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
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

    public String getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(String selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
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



//@Entity
//public class TestSubmission {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne(optional = false)
//    private User user;
//
//    @ManyToOne(optional = false)
//    private Question question;
//
//    private double score;
//
//    private LocalDateTime submittedAt;
//
//    public TestSubmission() {
//    }
//
//    public TestSubmission(Long id, User user, Question question, double score, LocalDateTime submittedAt) {
//        this.id = id;
//        this.user = user;
//        this.question = question;
//        this.score = score;
//        this.submittedAt = submittedAt;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public double getScore() {
//        return score;
//    }
//
//    public Question getQuestion() {
//        return question;
//    }
//
//    public void setQuestion(Question question) {
//        this.question = question;
//    }
//
//    public void setScore(double score) {
//        this.score = score;
//    }
//
//    public LocalDateTime getSubmittedAt() {
//        return submittedAt;
//    }
//
//    public void setSubmittedAt(LocalDateTime submittedAt) {
//        this.submittedAt = submittedAt;
//    }
//}

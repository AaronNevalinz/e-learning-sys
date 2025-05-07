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

    private LocalDateTime submittedAt;

    @OneToMany(mappedBy = "testAttempt", cascade = CascadeType.ALL)
    private List<TestSubmission> submissions = new ArrayList<>();

    public TestAttempt() {
    }

    public TestAttempt(Long id, User user, LocalDateTime submittedAt, List<TestSubmission> submissions) {
        this.id = id;
        this.user = user;
        this.submittedAt = submittedAt;
        this.submissions = submissions;
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


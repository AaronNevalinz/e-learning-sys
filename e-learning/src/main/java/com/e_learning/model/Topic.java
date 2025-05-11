package com.e_learning.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int orderInCourse;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subtopic> subtopics = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();


    public Topic() {
    }

    public Topic(Long id, String title, String description, int orderInCourse, Course course, List<Subtopic> subtopics, List<Question> questions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.orderInCourse = orderInCourse;
        this.course = course;
        this.subtopics = subtopics;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Subtopic> getSubtopics() {
        return subtopics;
    }

    public void setSubtopics(List<Subtopic> subtopics) {
        this.subtopics = subtopics;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public int getOrderInCourse() {
        return orderInCourse;
    }

    public void setOrderInCourse(int orderInCourse) {
        this.orderInCourse = orderInCourse;
    }
}


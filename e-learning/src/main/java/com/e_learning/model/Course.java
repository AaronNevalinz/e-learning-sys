package com.e_learning.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "published", nullable = false)
    private boolean published = false;

//    @CreationTimestamp
//    @Column(updatable = false, nullable = false)
//    private LocalDateTime createdAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "courses")
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Enrollment> enrollments = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics = new ArrayList<>();

    // ✅ ADD THIS: Link to course votes
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseVote> votes = new ArrayList<>();

    // Add this to link comments with the course
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseComment> comments = new ArrayList<>();

    @Column(name = "image_url")
    private String imageUrl;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Constructors
    public Course() {}



    // Getters and Setters
    public Long getId() {
        return id;
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

    public Course(Long id, String title, String description, boolean published, LocalDateTime createdAt, Set<User> users, Set<Enrollment> enrollments, List<Topic> topics, List<CourseVote> votes, List<CourseComment> comments, String imageUrl, Category category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
        //this.createdAt = createdAt;
        this.users = users;
        this.enrollments = enrollments;
        this.topics = topics;
        this.votes = votes;
        this.comments = comments;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(Set<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public List<CourseVote> getVotes() {
        return votes;
    }

    public void setVotes(List<CourseVote> votes) {
        this.votes = votes;
    }

    public List<CourseComment> getComments() {
        return comments;
    }

    public void setComments(List<CourseComment> comments) {
        this.comments = comments;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
}


package com.e_learning.service;

import com.e_learning.exception.ResourceNotFoundException;
import com.e_learning.model.Course;
import com.e_learning.model.CourseComment;
import com.e_learning.model.User;
import com.e_learning.repository.CourseCommentRepository;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseCommentService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseCommentRepository commentRepository;

    public CourseCommentService(CourseRepository courseRepository,
                                UserRepository userRepository,
                                CourseCommentRepository commentRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public CourseComment addComment(Long courseId, String username, CourseComment comment) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        comment.setCourse(course);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public long getCommentCountByCourseId(Long courseId) {
        return commentRepository.countByCourseId(courseId);
    }

    public List<CourseComment> getCommentsByCourseId(Long courseId) {
        return commentRepository.findByCourseId(courseId);
    }


    public CourseComment updateComment(Long commentId, String updatedText) {
        CourseComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        comment.setContent(updatedText);
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        CourseComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));
        commentRepository.delete(comment);
    }

}


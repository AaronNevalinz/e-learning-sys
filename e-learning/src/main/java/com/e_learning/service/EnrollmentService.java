package com.e_learning.service;

import com.e_learning.model.Course;
import com.e_learning.model.Enrollment;
import com.e_learning.model.User;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.EnrollmentRepository;
import com.e_learning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private CourseRepository courseRepo;

    public Enrollment enrollUser(Long userId, Long courseId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepo.findByUserAndCourse(user, course).isPresent()) {
            throw new RuntimeException("User already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setStatus("ACTIVE");
        enrollment.setProgressPercentage(0.0);

        return enrollmentRepo.save(enrollment);
    }
}


package com.e_learning.service;

import com.e_learning.dto.EnrolledUserDTO;
import com.e_learning.dto.EnrollmentDTO;
import com.e_learning.model.Course;
import com.e_learning.model.Enrollment;
import com.e_learning.model.User;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.EnrollmentRepository;
import com.e_learning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepo;
    private final  UserRepository userRepo;
    private final CourseRepository courseRepo;

    private EnrollmentService(EnrollmentRepository enrollmentRepo, UserRepository userRepo, CourseRepository courseRepo){
        this.enrollmentRepo =enrollmentRepo;
        this.userRepo =userRepo;
        this.courseRepo = courseRepo;
    }

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

    public List<EnrollmentDTO> getAllEnrollments() {
        return enrollmentRepo.fetchAllEnrollments();
    }

    public List<EnrolledUserDTO> getUsersByCourseId(Long courseId) {
        return enrollmentRepo.findUsersByCourseId(courseId);
    }

}


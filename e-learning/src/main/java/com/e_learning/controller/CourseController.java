package com.e_learning.controller;

import com.e_learning.model.Course;
import com.e_learning.service.CourseService;
import com.e_learning.service.ResponseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private final CourseService courseService;
    private final ResponseService responseService;

    private CourseController(CourseService courseService, ResponseService responseService){
        this.courseService =courseService;
        this.responseService = responseService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createCourse(@RequestBody Course course) {
        Course createdCourse = courseService.createCourse(course);
        return responseService.createSuccessResponse(201, createdCourse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return responseService.createSuccessResponse(200, courses, HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Map<String, Object>> getCourseById(@PathVariable Long courseId) {
        Optional<Course> course = courseService.getCourseById(courseId);
        return responseService.createSuccessResponse(200, course, HttpStatus.OK);
    }

    @PutMapping("/update/course/{id}")
    public ResponseEntity<Map<String, Object>> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        Course course = courseService.updateCourse(id, updatedCourse);
        return responseService.createSuccessResponse(200, course, HttpStatus.OK);
    }

    @DeleteMapping("/delete/course/{id}")
    public ResponseEntity<Map<String, Object>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return responseService.createSuccessResponse(200, "Course deleted successfully", HttpStatus.OK);
    }


}


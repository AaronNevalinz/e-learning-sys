package com.e_learning.repository;

import com.e_learning.model.Course;
import com.e_learning.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByCourseId(Long courseId);
    List<Topic> findByCourseIdOrderByOrderInCourseAsc(Long courseId);
    @Query("SELECT MAX(t.orderInCourse) FROM Topic t WHERE t.course.id = :courseId")
    Optional<Integer> findMaxOrderInCourse(@Param("courseId") Long courseId);



}


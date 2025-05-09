package com.e_learning.repository;

import com.e_learning.model.Course;
import com.e_learning.model.Topic;
import com.e_learning.model.User;
import com.e_learning.model.UserTopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTopicProgressRepository extends JpaRepository<UserTopicProgress, Long> {
    Optional<UserTopicProgress> findByUserAndTopic(User user, Topic topic);

    long countByUserAndTopicCourseAndCompletedTrue(User user, Course course);

    List<UserTopicProgress> findByUser(User user);
}


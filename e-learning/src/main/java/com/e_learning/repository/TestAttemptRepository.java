package com.e_learning.repository;

import com.e_learning.model.TestAttempt;
import com.e_learning.model.Topic;
import com.e_learning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TestAttemptRepository extends JpaRepository<TestAttempt, Long> {
    List<TestAttempt> findByUser(User user);
    Optional<TestAttempt> findByUserAndTopic(User user, Topic topic);

}

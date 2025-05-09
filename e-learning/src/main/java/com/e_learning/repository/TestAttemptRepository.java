package com.e_learning.repository;

import com.e_learning.model.TestAttempt;
import com.e_learning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestAttemptRepository extends JpaRepository<TestAttempt, Long> {
    List<TestAttempt> findByUser(User user);

}

package com.e_learning.repository;

import com.e_learning.model.TestAttempt;
import com.e_learning.model.TestSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestSubmissionRepository extends JpaRepository<TestSubmission, Long> {

    // This lets you fetch all submissions made by a specific user
    List<TestSubmission> findByTestAttemptUserId(Long userId);
    List<TestSubmission> findByTestAttemptUserIdAndQuestionTopicId(Long userId, Long topicId);
    void deleteByTestAttempt(TestAttempt attempt);


}



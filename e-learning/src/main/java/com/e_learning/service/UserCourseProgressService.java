package com.e_learning.service;

import com.e_learning.dto.UserCourseProgressDTO;
import com.e_learning.model.*;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.TestAttemptRepository;
import com.e_learning.repository.UserRepository;
import com.e_learning.repository.UserTopicProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserCourseProgressService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final UserTopicProgressRepository userTopicProgressRepository;
    private final TestAttemptRepository testAttemptRepository;

    public UserCourseProgressService(CourseRepository courseRepository,
                                     UserRepository userRepository,
                                     UserTopicProgressRepository userTopicProgressRepository, TestAttemptRepository testAttemptRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.userTopicProgressRepository = userTopicProgressRepository;
        this.testAttemptRepository = testAttemptRepository;
    }

//    public UserCourseProgressDTO getProgress(String username, Long courseId) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Course course = courseRepository.findById(courseId)
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        List<Topic> allTopics = course.getTopics();
//        int total = allTopics.size();
//
//        List<UserTopicProgress> completedProgress = userTopicProgressRepository.findByUser(user);
//        Set<Long> completedTopicIds = completedProgress.stream()
//                .filter(UserTopicProgress::isCompleted)
//                .map(p -> p.getTopic().getId())
//                .collect(Collectors.toSet());
//
//        int completed = (int) allTopics.stream()
//                .filter(topic -> completedTopicIds.contains(topic.getId()))
//                .count();
//
//        List<UserCourseProgressDTO.TopicProgressDTO> topicDTOs = allTopics.stream().map(topic -> {
//            UserCourseProgressDTO.TopicProgressDTO dto = new UserCourseProgressDTO.TopicProgressDTO();
//            dto.setTopicId(topic.getId());
//            dto.setTopicTitle(topic.getTitle());
//            dto.setCompleted(completedTopicIds.contains(topic.getId()));
//            return dto;
//        }).toList();
//
//        UserCourseProgressDTO dto = new UserCourseProgressDTO();
//        dto.setCourseId(course.getId());
//        dto.setCourseTitle(course.getTitle());
//        dto.setTotalTopics(total);
//        dto.setCompletedTopics(completed);
//        dto.setProgressPercentage(total == 0 ? 0.0 : (100.0 * completed / total));
//        dto.setTopics(topicDTOs);
//
//        return dto;
//    }


    public UserCourseProgressDTO getProgress(String username, Long courseId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Topic> allTopics = course.getTopics();
        int total = allTopics.size();

        List<TestAttempt> attempts = testAttemptRepository.findByUser(user);

        // Only consider passed attempts
        Set<Long> completedTopicIds = attempts.stream()
                .filter(TestAttempt::isPassed)
                .map(attempt -> attempt.getTopic().getId())
                .collect(Collectors.toSet());

        int completed = (int) allTopics.stream()
                .filter(topic -> completedTopicIds.contains(topic.getId()))
                .count();

        List<UserCourseProgressDTO.TopicProgressDTO> topicDTOs = allTopics.stream().map(topic -> {
            UserCourseProgressDTO.TopicProgressDTO dto = new UserCourseProgressDTO.TopicProgressDTO();
            dto.setTopicId(topic.getId());
            dto.setTopicTitle(topic.getTitle());
            dto.setCompleted(completedTopicIds.contains(topic.getId()));
            return dto;
        }).toList();

        UserCourseProgressDTO dto = new UserCourseProgressDTO();
        dto.setCourseId(course.getId());
        dto.setCourseTitle(course.getTitle());
        dto.setTotalTopics(total);
        dto.setCompletedTopics(completed);
        dto.setProgressPercentage(total == 0 ? 0.0 : (100.0 * completed / total));
        dto.setTopics(topicDTOs);

        return dto;
    }


}

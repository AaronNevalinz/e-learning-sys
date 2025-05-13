package com.e_learning.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import com.e_learning.dto.BadgeDTO;
import com.e_learning.dto.UserCourseProgressDTO;
import com.e_learning.model.Course;
import com.e_learning.model.TestAttempt;
import com.e_learning.model.Topic;
import com.e_learning.model.User;
import com.e_learning.model.UserBadge;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.TestAttemptRepository;
import com.e_learning.repository.UserBadgeRepository;
import com.e_learning.repository.UserRepository;
import com.e_learning.repository.UserTopicProgressRepository;

@Service
public class UserCourseProgressService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final TestAttemptRepository testAttemptRepository;
    private final BadgeService badgeService;
    private final UserBadgeRepository userBadgeRepository;

    public UserCourseProgressService(CourseRepository courseRepository,
                                     UserRepository userRepository,
                                     UserTopicProgressRepository userTopicProgressRepository, TestAttemptRepository testAttemptRepository, ApplicationEventPublisher eventPublisher, BadgeService badgeService, UserBadgeRepository userBadgeRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.testAttemptRepository = testAttemptRepository;
        this.badgeService = badgeService;
        this.userBadgeRepository = userBadgeRepository;
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

        double progressPercentage = total == 0 ? 0.0 :(100* completed / total);


        if(progressPercentage == 100.0) {
            badgeService.awardBadge("course_complete", user.getId(), courseId);
        }

        Optional<UserBadge> userBadge = userBadgeRepository.findByUserIdAndBadgeCodeAndReferenceId(
                user.getId(), "course_complete", course.getId()
        );





        List<UserCourseProgressDTO.TopicProgressDTO> topicDTOs = allTopics.stream().map(topic -> {
            UserCourseProgressDTO.TopicProgressDTO dto = new UserCourseProgressDTO.TopicProgressDTO();
            dto.setTopicId(topic.getId());
            dto.setTopicTitle(topic.getTitle());
            dto.setCompleted(completedTopicIds.contains(topic.getId()));
            return dto;
        }).toList();

        UserCourseProgressDTO dto = new UserCourseProgressDTO();
        userBadge.ifPresent(badge->{
            dto.setBadgeAwarded(true);
            dto.setBadge(new BadgeDTO(badge.getBadge().getName(), badge.getBadge().getIcon()));
        });
        dto.setCourseId(course.getId());
        dto.setCourseTitle(course.getTitle());
        dto.setTotalTopics(total);
        dto.setCompletedTopics(completed);
        dto.setProgressPercentage(progressPercentage);
        dto.setTopics(topicDTOs);

        return dto;
    }


}
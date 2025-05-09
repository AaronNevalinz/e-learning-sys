package com.e_learning.service;

import com.e_learning.dto.TopicAccessDTO;
import com.e_learning.exception.ResourceNotFoundException;
import com.e_learning.model.Course;
import com.e_learning.model.Topic;
import com.e_learning.model.User;
import com.e_learning.model.UserTopicProgress;
import com.e_learning.repository.CourseRepository;
import com.e_learning.repository.TopicRepository;
import com.e_learning.repository.UserRepository;
import com.e_learning.repository.UserTopicProgressRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final CourseRepository courseRepository;
    private final UserTopicProgressRepository userTopicProgressRepository;
    private final UserRepository userRepository;

    public TopicService(TopicRepository topicRepository, CourseRepository courseRepository,
                        UserTopicProgressRepository userTopicProgressRepository, UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.userTopicProgressRepository = userTopicProgressRepository;
        this.userRepository =userRepository;
    }

//    public Topic createTopic(Long courseId, Topic topic) {
//        Course course = courseRepository.findById(courseId)
//                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
//        topic.setCourse(course);
//        return topicRepository.save(topic);
//    }

    public Topic createTopic(Long courseId, Topic topic) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        // Fetch current max order for the course
        Integer maxOrder = topicRepository.findMaxOrderInCourse(courseId).orElse(0);
        topic.setOrderInCourse(maxOrder + 1);

        topic.setCourse(course);
        return topicRepository.save(topic);
    }


    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }


    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

//    public List<Topic> getTopicsByCourse(Long courseId) {
//        return topicRepository.findByCourseId(courseId);
//    }

    public List<TopicAccessDTO> getTopicsByCourse(Long courseId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Topic> topics = topicRepository.findByCourseIdOrderByOrderInCourseAsc(courseId);
        List<TopicAccessDTO> result = new ArrayList<>();

        boolean canAccess = true;

        for (Topic topic : topics) {
            boolean isCompleted = userTopicProgressRepository
                    .findByUserAndTopic(user, topic)
                    .map(UserTopicProgress::isCompleted)
                    .orElse(false);

            boolean locked = !canAccess;

            result.add(new TopicAccessDTO(
                    topic.getId(),
                    topic.getTitle(),
                    topic.getDescription(),
                    topic.getOrderInCourse(),
                    locked
            ));

            canAccess = isCompleted;
        }

        return result;
    }

    public Topic updateTopic(Long id, Topic updatedTopic) {
        Topic existing = topicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));

        if (updatedTopic.getTitle() != null) {
            existing.setTitle(updatedTopic.getTitle());
        }
        if (updatedTopic.getDescription() != null) {
            existing.setDescription(updatedTopic.getDescription());
        }
        if (updatedTopic.getCourse() != null) {
            existing.setCourse(updatedTopic.getCourse());
        }
        return topicRepository.save(existing);
    }


    public void deleteTopic(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
        topicRepository.delete(topic);
    }

}


/* eslint-disable react/prop-types */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Label } from "./ui/label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import axios from "axios";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import CourseProgressCard from "./CourseProgressCard";
import { toast } from "sonner";

export function AppSidebar({
  course_id,
  title,
  topics,
  onSubTopicClick,
  currentTopicId,
}) {
  const { token, user } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [progress, setProgress] = useState(null);
  const [userTopics, setUserTopics] = useState([]);
  const [completedTopicIds, setCompletedTopicIds] = useState([]);

  const fetchAllQuiz = (e, id) => {
    e.preventDefault();
    var options = {
      method: "GET",
      url: `${API_URL}/tests/topics/${id}/questions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        setQuizData(data.result);
        console.log(response.data);
        setOpen(true); // Open the dialog when quiz data is fetched
        setCurrentQuestionIndex(0); // Reset question index
        setSelectedAnswers({}); // Clear previous answers
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Failed to fetch quiz questions.");
      });
  };

  const fetchCourseProgress = () => {
    var options = {
      method: "GET",
      url: `${API_URL}/progress/courseId/${course_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.result) {
          setProgress(data.result.progressPercentage);
          setUserTopics(data.result.topics);
          const completedIds = data.result.topics
            .filter((ut) => ut.completed)
            .map((ut) => ut.topicId);
          setCompletedTopicIds(completedIds);
          console.log("User Topics:", userTopics);
          console.log("Completed Topic IDs:", completedTopicIds);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Failed to fetch course progress.");
      });
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerChange = (selectedOptionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOptionId,
    }));
  };

  const handleSubmit = async () => {
    const submissions = quizData.map((question) => ({
      questionId: question.id,
      selectedAnswerId: selectedAnswers[question.id],
    }));

    const payload = {
      userId: user.id,
      submissions,
    };

    console.log("Payload to be sent:", payload);

    const options = {
      method: "POST",
      url: `${API_URL}/tests/submit`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      const response = await axios.request(options);
      console.log("Response from server:", response.data);
      const data = response.data;
      let score = data.result.score;
      const percentScore = (score / quizData.length) * 100;
      console.log(percentScore);

      if (percentScore > 60) {
        toast.success(
          `Congratulations! You scored ${percentScore}%. Proceeding to the next topic.`,
          {
            duration: 5000, // Duration in milliseconds (5 seconds)
          }
        );

        const currentTopic = topics.find((t) => t.id === quizData[0]?.topicId);
        if (currentTopic && !completedTopicIds.includes(currentTopic.id)) {
          setCompletedTopicIds((prevIds) => [...prevIds, currentTopic.id]);
        }
        fetchCourseProgress(); // Refetch progress
        // Directly open the next topic's accordion
        const currentTopicIndex = topics.findIndex(
          (topic) => topic.id === currentTopic?.id
        );
        const nextTopic = topics[currentTopicIndex + 1];
        if (nextTopic) {
          // Programmatically open the next accordion item
          // You'll need a way to control the Accordion's open state
          // One common way is to use a state variable for the currently open item
          // Let's assume you have a state like [openAccordionId, setOpenAccordionId] = useState(null);
          // You'd then update this state here:
          // setOpenAccordionId(nextTopic.id);
          // And in your Accordion component:
          // <Accordion collapsible type="single" value={openAccordionId} onValueChange={setOpenAccordionId} className="space-y-4">
          onSubTopicClick(nextTopic.id); // navigate to the content
        }
      } else {
        toast.error(
          `Your score is ${percentScore}%. You need at least 60 to proceed.`
        );
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error(
        "An error occurred while submitting the quiz. Please try again."
      );
    }
  };

  const mergedTopics =
    topics &&
    topics.map((topic, index) => {
      const isCompleted = completedTopicIds.includes(topic.id);
      const isNextAvailable =
        index === 0 || completedTopicIds.includes(topics[index - 1]?.id);
      return {
        ...topic,
        completed: isCompleted,
        isNextAvailable: isNextAvailable,
      };
    });

  console.log("Merged Topics with Availability:", mergedTopics);

  const goToNextTopic = () => {
    const currentTopicIndex = topics.findIndex(
      (topic) => topic.id === currentTopicId
    );
    const nextTopic = topics[currentTopicIndex + 1];

    if (
      nextTopic &&
      completedTopicIds.includes(topics[currentTopicIndex]?.id)
    ) {
      onSubTopicClick(nextTopic.id);
    } else if (!nextTopic) {
      toast.info("You have completed all topics in this series!");
    } else {
      toast.info("Please complete the current topic to unlock the next one.");
    }
  };

  useEffect(() => {
    fetchCourseProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course_id]);

  return (
    <Sidebar className={""}>
      <SidebarContent className={"bg-slate-900 text-slate-200 "}>
        <SidebarHeader>
          <CourseProgressCard progress={progress} title={title} />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className={"-mt-10"}>
            <SidebarMenu>
              <Accordion collapsible type="single" className="space-y-4">
                {(mergedTopics || []).map((topic) => (
                  <AccordionItem
                    value={`${topic.id}`}
                    key={topic.id}
                    disabled={!topic.isNextAvailable}
                    className={`${
                      !topic.isNextAvailable
                        ? "opacity-80 pointer-events-none blur-[1px]"
                        : ""
                    }`}
                  >
                    <AccordionTrigger
                      className={`bg-slate-800 text-left text-base px-4 cursor-pointer w-full py-4 rounded-md ${
                        !topic.isNextAvailable ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {topic.title}
                        {!topic.isNextAvailable && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3v13.5a3 3 0 003 3h9a3 3 0 003-3v-3.75m-9 0h7.5"
                            />
                          </svg>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                      {(topic.subtopics || []).map((subtopic) => (
                        <p
                          key={subtopic.id}
                          onClick={() => onSubTopicClick(subtopic.id)}
                          className={`hover:underline cursor-pointer transition-all hover:text-green-500
                        }`}
                        >
                          {subtopic.title}
                        </p>
                      ))}

                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <form
                            action=""
                            onSubmit={(e) => fetchAllQuiz(e, topic.id)}
                          >
                            {topic.completed ? (
                              <Button
                                variant="outline"
                                size={"sm"}
                                className={
                                  "cursor-pointer bg-gradient-to-br from-green-900 to-green-800 border border-gray-700"
                                }
                                disabled={!topic.isNextAvailable}
                              >
                                Done
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size={"sm"}
                                className={
                                  "cursor-pointer bg-gradient-to-br from-purple-900 to-gray-800 border border-gray-700"
                                }
                                disabled={!topic.isNextAvailable}
                              >
                                Start Quiz
                              </Button>
                            )}
                          </form>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Quiz Time!</DialogTitle>
                            <DialogDescription>
                              Answer the following questions.
                            </DialogDescription>
                          </DialogHeader>
                          {quizData.length > 0 ? (
                            <div className="space-y-6">
                              <div>
                                <h2 className="text-lg font-semibold capitalize text-gray-500">
                                  Question {currentQuestionIndex + 1} of{" "}
                                  {quizData.length}
                                </h2>
                                <p className="text-2xl text-justify font-bold text-gray-800">
                                  {currentQuestion?.content}?
                                </p>
                              </div>

                              <RadioGroup.Root
                                value={
                                  selectedAnswers[currentQuestion?.id] ||
                                  undefined
                                }
                                onValueChange={handleAnswerChange}
                                className="space-y-4"
                              >
                                {currentQuestion?.answerOptions.map(
                                  (option) => (
                                    <div
                                      key={option.id}
                                      className="flex items-center flex-row-reverse justify-between"
                                    >
                                      <RadioGroup.Item
                                        value={option.id}
                                        id={`option-${option.id}`}
                                        className="h-5 w-5 rounded-full border border-gray-600 mr-3"
                                      >
                                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full bg-gray-800 rounded-full" />
                                      </RadioGroup.Item>
                                      <Label
                                        htmlFor={`option-${option}`}
                                        className={`text-gray-900 font-medium ${
                                          selectedAnswers[
                                            currentQuestion?.id
                                          ] === option.id
                                            ? "text-orange-600"
                                            : ""
                                        }`}
                                      >
                                        {option.answerText}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </RadioGroup.Root>

                              <div className="flex justify-between">
                                <div className="flex items-center justify-between">
                                  <Button
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-pointer"
                                  >
                                    PREVIOUS
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Button
                                    onClick={handleNextQuestion}
                                    disabled={isLastQuestion}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                  >
                                    NEXT
                                  </Button>
                                </div>
                              </div>

                              {isLastQuestion && (
                                <DialogClose>
                                  <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-gradient-to-br from-purple-900 to-red-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                  >
                                    SUBMIT
                                  </Button>
                                </DialogClose>
                              )}
                            </div>
                          ) : (
                            <p>Loading quiz questions...</p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

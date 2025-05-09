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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useContext, useState } from "react";
import { Label } from "./ui/label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import axios from "axios";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";

export function AppSidebar({ title, topics, onSubTopicClick }) {
  const { token } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState([]);

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
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // setSelectedAnswer(null); // Clear selected answer when moving to the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    // setSelectedAnswer(null);
  };

  const handleAnswerChange = (selectedOptionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedOptionId, // Store the selected answer for the current question
    }));
  };

  const handleSubmit = () => {
    console.log("Selected Answers:", selectedAnswers);
    console.log("Quiz Data:", quizData);
    console.log("Submissions:", submissions);
    setSelectedAnswers({})
    
    const submissions = quizData.map((question) => ({
      questionId: question.id,
      selectedAnswerIds: question.answerOptions
        .filter((option) => option.answerText === selectedAnswers[question.id])
        .map((option) => option.id),
    }));

    console.log("submissions:", submissions);

    // Handle quiz submission logic here (e.g., calculate score, send data)
    alert("Quiz submitted! (Add your submission logic here)");
    setOpen(false); // Close dialog after submit
  };
  return (
    <Sidebar className={""}>
      <SidebarContent className={"bg-gray-50"}>
        <SidebarHeader>
          <h1 className="text-lg font-black text-center">{title}</h1>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>
            {/* <h1 className="text-lg font-black my-3">Object-Oriented Principles in PHP</h1> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className={"-mt-10"}>
            <SidebarMenu>
              <Accordion collapsible type="single" className="space-y-4">
                {(topics || []).map((topic) => (
                  <AccordionItem value={`${topic.id}`} key={topic.id}>
                    <AccordionTrigger className="bg-[#d6d6d6] text-left px-4 cursor-pointer w-full py-2">
                      {topic.title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 flex flex-col gap-y-3 my-2 text-sm">
                      {(topic.subtopics || []).map((subtopic) => (
                        <p
                          key={subtopic.id}
                          onClick={() => onSubTopicClick(subtopic.id)}
                          className={`hover:underline cursor-pointer transition-all ${
                            selectedAnswers[subtopic.id] === subtopic.title
                              ? "text-amber-300"
                              : "hover:text-green-500"
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
                            <Button variant="outline" size={'sm'} className={"cursor-pointer bg-green-600 hover:bg-green-700"}>Start Quiz</Button>
                          </form>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Quiz Time!</DialogTitle>
                            <DialogDescription>
                              Answer the following questions.
                            </DialogDescription>
                          </DialogHeader>
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
                              value={selectedAnswers[currentQuestion?.id] || undefined}
                              onValueChange={handleAnswerChange}
                              className="space-y-4"
                            >
                              {currentQuestion?.answerOptions.map((option) => (
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
                                      selectedAnswers[currentQuestion?.id] === option.id
                                        ? "text-amber-300"
                                        : ""
                                    }`}
                                  >
                                    {option.answerText}
                                  </Label>
                                </div>
                              ))}
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
                              <Button
                                onClick={handleSubmit}
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                              >
                                SUBMIT
                              </Button>
                            )}
                          </div>
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

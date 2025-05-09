import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const quizData = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin"],
  },
  {
    id: 2,
    text: "What is the highest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Mount Everest"],
  },
  {
    id: 3,
    text: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe"],
  },
  {
    id: 4,
    text: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter"],
  },
  {
    id: 5,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
  },
];

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [markedForReview, setMarkedForReview] = useState(false); // Added state for "Mark for Review"
  const [open, setOpen] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null); // Clear selected answer when moving to the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setSelectedAnswer(null);
  };

  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
  };

  const handleClearAnswer = () => {
    setSelectedAnswer(null);
  };

  const handleMarkForReview = () => {
    setMarkedForReview(!markedForReview);
  };

  const handleSubmit = () => {
    // Handle quiz submission logic here (e.g., calculate score, send data)
    alert("Quiz submitted!  (Add your submission logic here)");
    setOpen(false); // Close dialog after submit
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Start Quiz</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Quiz Time!</DialogTitle>
            <DialogDescription>
              Answer the following questions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                QUESTION {currentQuestionIndex + 1} OF {quizData.length}
              </h2>
              <p className="text-sm text-gray-600">{currentQuestion.text}</p>
            </div>

            <RadioGroup
              value={selectedAnswer || undefined}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center">
                  <RadioGroupItem
                    value={option}
                    id={`option-${option}`}
                    className="mr-3"
                  />
                  <Label
                    htmlFor={`option-${option}`}
                    className="text-gray-900 font-medium"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex items-center justify-between">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                PREVIOUS
              </Button>
              <Button
                onClick={handleMarkForReview}
                className={cn(
                  "font-bold py-2 px-4 rounded",
                  markedForReview
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white" // Keep yellow when marked
                    : "bg-gray-400 hover:bg-gray-500 text-gray-800" // Change only on hover if not marked
                )}
              >
                MARK FOR REVIEW & NEXT
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Button
                onClick={handleNextQuestion}
                disabled={isLastQuestion}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                NEXT
              </Button>
              <Button
                onClick={handleClearAnswer}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                CLEAR ANSWER
              </Button>
            </div>

            {isLastQuestion && (
              <Button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                SUBMIT
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizApp;

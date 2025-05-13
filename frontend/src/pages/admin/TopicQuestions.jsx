import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdEye } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaTrashArrowUp } from "react-icons/fa6";
import { Info } from "lucide-react";
export default function TopicQuestions() {
  const { token } = useContext(AppContext);
  const { topic_id } = useParams();
  const [questions, setQuestions] = useState([]);

  console.log(topic_id);

  const fetchAllTopicQuestions = () => {
    var options = {
      method: "GET",
      url: `${API_URL}/tests/topics/${topic_id}/questions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        setQuestions(data.result);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDeleteQuestion = (e, id) => {
    e.preventDefault();
    var options = {
      method: "DELETE",
      url: `${API_URL}/tests/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.status === 200) {
          toast.success(data.result.message);
          // Update the state to remove the deleted question
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        } else {
          toast.error("An error occured deleting Qn. Try Again");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllTopicQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full mt-10 p-8 rounded-lg border border-gray-100 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Quiz</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>List of quizzes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow className={"text-lg uppercase font-bold"}>
            <TableHead>Quiz SN</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Choices</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg shadow-lg">
          {questions?.map((question, index) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-gray-100 border-gray-300 text-gray-700"
                >
                  {question && question.content.substring(0, 60)}...{" "}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{question.answerOptions?.length}</span>
                </div>
              </TableCell>
              <TableCell className=" flex gap-x-4">
                <Dialog>
                  <DialogTrigger>
                    <IoMdEye size={26} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <div className="mt-10">
                      <h1 className="uppercase">{question.content}</h1>
                      <div className="space-y-4 mt-5">
                        <div className="flex justify-between text-lg font-medium">
                          <p>Answer</p>
                          <p>Value</p>
                        </div>
                        {question?.answerOptions.map((answer, index) => (
                          <div
                            key={answer.id}
                            className="flex justify-between "
                          >
                            {console.log(answer)}

                            <p key={answer.id}>
                              {index + 1}. {answer.answerText}
                            </p>
                            <p>{answer.correct ? "Correct" : "Incorrect"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <FaTrashArrowUp
                      size={20}
                      className="fill-red-700 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <div className="text-center text-sm mt-4">
                      <p>Are you sure you wanna delete this</p>
                      <p>Mind you there is no going back</p>
                    </div>
                    <div className="flex justify-center gap-x-4">
                      <DialogClose>
                        <Button size={"sm"} className={"cursor-pointer"}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <form
                        action=""
                        onSubmit={(e) => handleDeleteQuestion(e, question.id)}
                      >
                        <DialogClose>
                          <Button
                            size={"sm"}
                            variant={"destructive"}
                            className={"bg-red-700 cursor-pointer"}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

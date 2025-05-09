import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdEye } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
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
        const data = response.data
        setQuestions(data.result)
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(()=>{
    fetchAllTopicQuestions()
  }, [])
  return (
    <div>
      <h1>Questions for topic 1</h1>
      <Table className={"border rounded-full mt-4"}>
        <TableHeader className={"bg-slate-300"}>
          <TableRow className={""}>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Choices</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions?.map((question, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index+1}</TableCell>
                  <TableCell>{question && question.content.substring(0,60)}... </TableCell>
                  <TableCell>{question.answerOptions?.length}</TableCell>
                  <TableCell className="flex items-center gap-x-3">
                    <Dialog>
                      <DialogTrigger>
                        <IoMdEye size={20} className="cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <div className="mt-3">
                          <h1 className="uppercase text-sm font-bold">
                            view question
                          </h1>
                          <Input value={"Hello"} />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <FaTrash
                          size={15}
                          className="fill-red-500 cursor-pointer"
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
                          <Button
                            size={"sm"}
                            variant={"destructive"}
                            className={"bg-red-700 cursor-pointer"}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className={'text-center py-2'}>
                <p className="text-center">No Questions created yet</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

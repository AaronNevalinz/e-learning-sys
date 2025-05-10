import { Button } from "@/components/ui/button";
import { FaBookBookmark } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
import { toast } from "sonner";
import * as RadioGroup from "@radix-ui/react-radio-group";
import axios from "axios";

/**
 * The `CreateCourse` component is a React functional component that allows administrators
 * to create and manage course topics. It provides functionality to fetch existing topics,
 * add new topics, and manage multiple-choice questions for each topic. The component
 * integrates with an API to handle course-related data and uses various UI elements
 * for user interaction.
 *
 * @component
 * @returns {JSX.Element} The rendered `CreateCourse` component.
 *
 * @example
 * // Usage in a React application
 * import CreateCourse from './CreateCourse';
 *
 * function App() {
 *   return <CreateCourse />;
 * }
 *
 * @remarks
 * - Requires `AppContext` to provide authentication token.
 * - Expects `useLocation` to pass course data via `location.state`.
 * - Uses `API_URL` for API endpoint configuration.
 *
 * @dependencies
 * - React hooks: `useState`, `useEffect`, `useContext`.
 * - Third-party libraries: `react-router-dom`, `react-toastify`.
 * - UI components: `Dialog`, `Button`, `Accordion`, `Input`, `Textarea`, `Checkbox`.
 *
 * @todo
 * - Improve error handling for API calls.
 * - Add validation for topic and question inputs.
 * - Optimize state management for better performance.
 */
export default function CreateCourse() {
  const { token } = useContext(AppContext);
  const location = useLocation();
  const newCourse = location.state?.course;
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: "", description: "" });
  const [choices, setChoices] = useState([]);
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  console.log(newCourse);
  

  /**
   * Fetches all topics associated with a specific course and updates the state with the retrieved topics.
   * Makes an API call to fetch topics for the course identified by `newCourse.id`.
   * If the request is successful and the response status is 200, the topics are set in the state.
   * Displays an error toast notification if the request fails.
   *
   * @async
   * @function fetchAllCourseTopics
   * @throws Will display an error toast if the API call fails.
   */
  const fetchAllCourseTopics = async () => {
    try {
      const res = await fetch(
        `${API_URL}/topics/course/${newCourse.id || newCourse.courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        setTopics(
          data.result.map((topic) => ({
            ...topic,
            id: topic.id || null, // Ensure `id` is set, fallback to `_id` or null
          }))
        );
        // console.log(data);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Oh... Error fetching posts, that's on us...");
    }
  };

  console.log(topics);
  
  //
  /**
   * Handles the addition of a new topic to the course.
   * Sends a POST request to the server to create a new topic associated with the specified course.
   * Updates the local state with the newly added topic if the operation is successful.
   *
   * @param {Object} e - The event object from the form submission.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   */
  const handleAddTopic = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${API_URL}/topics/course/${newCourse.id || newCourse.courseId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTopic),
      }
    );

    const data = await res.json();

    console.log(data);

    if (!newTopic.title.trim()) return;
    setTopics((prev) => [...prev, newTopic]);
    setNewTopic({ title: "", description: "" });
  };

  const handleAddQuestionChoice = () => {
    setChoices([...choices, {}]);
    console.log(choices);
  };

  const submitQuestions = (e, id) => {
    e.preventDefault();
    console.log(id);
    

    const options = {
      method: "POST",
      url: `${API_URL}/tests/topics/${id}/questions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        content: question,
        answerOptions: choices,
      },
    };    

    console.log(id);
    

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.status == 200) {
          toast("Question test added successfully...");
          setOpen(false);          
        }
        console.log(data);
        
      })
      .catch(function (error) {
        console.error(error);
      });

    setChoices([]);
    setQuestion("");
  };

  const publishCourse = (e) => {
    e.preventDefault();
    var options = {
      method: "PUT",
      url: `${API_URL}/courses/${newCourse.id || newCourse.courseId}/publish`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.status == 200) {
          toast.success("Course published successfully..");
          navigate("/dashboard/courses");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllCourseTopics();
  }, [newTopic]);

  return (
    <div className="">
      <div className="grid grid-cols-6 gap-x-6">
        <div className="col-span-2">
          <div className=" w-full h-48">
            <img
              src={newCourse && newCourse.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start flex-col">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "border-orange-500 rounded-none cursor-pointer text-orange-500 mt-5"
                  }
                >
                  <FaBookBookmark />
                  Add Course Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] shadow border mt-5 px-3 py-2">
                <form action="" onSubmit={handleAddTopic}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-left">
                        Topic Name
                      </Label>
                      <Input
                        id="name"
                        onChange={(e) =>
                          setNewTopic({ ...newTopic, title: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-left">
                        Description
                      </Label>
                      <Textarea
                        id="username"
                        onChange={(e) =>
                          setNewTopic({
                            ...newTopic,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="submit">Add Topic</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <form action="" onSubmit={publishCourse}>
              <Button
                type="submit"
                className={" rounded-none cursor-pointer  mt-3"}
              >
                <FaBookBookmark />
                Upload Course
              </Button>
            </form>
          </div>
        </div>
        <div className="col-span-4">
          <h1 className="uppercase text-3xl font-black text-slate-800 font-montserrat">
            {newCourse.title || newCourse.courseTitle}
          </h1>
          <p className="text-slate-600 my-2 font-medium text-sm">
            {newCourse.description || newCourse.courseDescription}
          </p>
          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="shadow p-2 ">
                <Accordion collapsible type="single" className="">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger
                      className={"hover:no-underline hover:cursor-pointer"}
                    >
                      <div key={index} className="flex gap-x-5 flex-1">
                        <div className="">
                          <p className="text-4xl font-black bg-slate-400 w-10 flex justify-center rounded-full">
                            {index + 1}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-xl font-medium">{topic.title}</h1>
                          <p className="text-gray-600 text-sm">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className={"mt-3"}>
                      <div className="text-center mb-3">
                        <h1 className="font-bold">
                          Subtopics(click to preview)
                        </h1>
                        {(topic?.subtopics || []).map((subtopic) => {
                          return (
                            <div
                              className="py-2 underline text-green-700 font-medium"
                              key={subtopic.id}
                            >
                              {subtopic.title}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-end">
                        <div className="flex  items-center w-[90%] ">
                          <Separator className={"flex-1 bg-blue-700"} />
                          <Link
                            to={`${topic.id}`}
                            className="text-blue-700 text-center flex-1 font-bold border border-blue-700 px-3 py-1 rounded-full"
                          >
                            Add subtopic
                          </Link>
                          <Separator className={"flex-1 bg-blue-700"} />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex justify-end gap-x-3">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer">
                      <p className="flex items-center px-2 py-0.5 gap-x-1 text-sm bg-orange-600 text-gray-100">
                        <IoNewspaperOutline />
                        <span className="text-xs">Add Topic Test</span>
                      </p>
                    </DialogTrigger>
                    <DialogContent className={""}>
                      <form
                        action=""
                        className="mt-4 space-x-4"
                        onSubmit={(e) => submitQuestions(e, topic.id)}
                      >
                        <h1 className="uppercase font-medium mb-2">
                          Add Multi-Choice Question
                        </h1>
                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Input
                            type={"text"}
                            onChange={(e) => setQuestion(e.target.value)}
                          />
                        </div>
                        <div className="my-4 flex justify-between">
                          <Label>Question Choices(Check the correct one)</Label>
                          <IoMdAddCircle
                            size={24}
                            className="fill-gray-700 cursor-pointer"
                            onClick={handleAddQuestionChoice}
                          />
                        </div>

                        <div className="space-y-2">
                          <RadioGroup.Root
                            className="flex flex-col gap-y-2"
                            value={
                              choices.findIndex((c) => c.correct)?.toString() ||
                              ""
                            }
                            onValueChange={(val) => {
                              const index = Number(val);
                              const updated = choices.map((c, i) => ({
                                ...c,
                                correct: i === index,
                              }));
                              setChoices(updated);
                            }}
                          >
                            {choices.map((choice, index) => (
                              <div
                                className="flex items-center gap-x-6"
                                key={index}
                              >
                                <Input
                                  value={choice.answerText || ""}
                                  onChange={(e) => {
                                    const updatedChoices = [...choices];
                                    updatedChoices[index] = {
                                      ...choice,
                                      answerText: e.target.value,
                                    };
                                    setChoices(updatedChoices);
                                  }}
                                />
                                <RadioGroup.Item
                                  value={index.toString()}
                                  className="h-5 w-5 rounded-full border border-gray-600"
                                >
                                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full bg-gray-800 rounded-full" />
                                </RadioGroup.Item>
                              </div>
                            ))}
                          </RadioGroup.Root>
                        </div>

                        <div className="flex justify-center my-4">
                          <Button type="submit" className={""}>
                            ADD
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  {console.log(topic)
                  }
                  <Link to={`topic/${topic.id}`}>
                    <p className="flex items-center px-2 py-0.5 gap-x-1 text-sm  text-black border border-gray-700">
                      <IoNewspaperOutline />
                      <span className="text-xs">View Topic Tests</span>
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

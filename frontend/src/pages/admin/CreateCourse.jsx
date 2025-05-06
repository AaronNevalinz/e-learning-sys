import { Button } from "@/components/ui/button";
import oopPhp from "../../assets/images/oop-in-php.jpg";
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
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
import { toast } from "sonner";

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
  // console.log(newCourse);
  
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: "", description: "" });
  const [choices, setChoices] = useState([]);

  /**
   * Fetches all topics associated with a specific course and updates the state with the retrieved topics.
   * Makes an API call to fetch topics for the course identified by `newCourse.id`.
   * If the request is successful and the response status is 200, the topics are set in the state.
   * Displays an error toast notification if the request fails.
   *
   * @async
   * @function fetchAllTopics
   * @throws Will display an error toast if the API call fails.
   */
  const fetchAllTopics = async () => {
    try {
      const res = await fetch(`${API_URL}/topics/course/${newCourse.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.status === 200) {
        setTopics(data.result);
        console.log(data);
                
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Oh... Error fetching posts, that's on us...");
    }
  };
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
    const res = await fetch(`${API_URL}/topics/course/${newCourse.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTopic),
    });

    const data = await res.json();

    console.log(data);

    if (!newTopic.title.trim()) return;
    setTopics((prev) => [...prev, newTopic]);
    setNewTopic({ title: "", description: "" });
  };



  const handleAddQuestionChoice = () => {
    setChoices([...choices, {}]);
  };

  useEffect(() => {
    fetchAllTopics();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-6 gap-x-6">
        <div className="col-span-2">
          <div className=" w-full h-48">
            <img src={oopPhp} alt="" className="w-full h-full object-cover" />
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
            <Button className={" rounded-none cursor-pointer  mt-3"}>
              <FaBookBookmark />
              Save Draft
            </Button>
            <Button className={" rounded-none cursor-pointer  mt-3"}>
              <FaBookBookmark />
              Upload Course
            </Button>
          </div>
        </div>
        <div className="col-span-4">
          <h1 className="uppercase text-3xl font-black text-slate-800 font-montserrat">
            {newCourse.title}
          </h1>
          <p className="text-slate-600 my-2 font-medium text-sm">
            {newCourse.description}
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
                      <h1 className="font-bold">Subtopics(click to preview)</h1>
                      {
                        (topic?.subtopics || []).map(subtopic=>{
                          return (
                            <div className="py-2 underline text-green-700 font-medium" key={subtopic.id}>
                              {subtopic.title}
                            </div>
                          )
                        })
                      }
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
                      <form action="" className="mt-4 space-x-4">
                        <h1 className="uppercase font-medium mb-2">
                          Add Multi-Choice Question
                        </h1>
                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Input />
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
                          {choices.map((choice, index) => (
                            <div
                              className="flex items-center gap-x-6"
                              key={index}
                            >
                              <Input
                                value={choice.text || ""}
                                onChange={(e) => {
                                  const updatedChoices = [...choices];
                                  updatedChoices[index] = {
                                    ...choice,
                                    text: e.target.value,
                                  };
                                  setChoices(updatedChoices);
                                }}
                              />
                              <Checkbox
                                checked={choice.isCorrect || false}
                                onCheckedChange={(checked) => {
                                  const updatedChoices = [...choices];
                                  updatedChoices[index] = {
                                    ...choice,
                                    isCorrect: checked,
                                  };
                                  setChoices(updatedChoices);
                                }}
                                className={"size-8"}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center my-4">
                          <Button className={""}>ADD</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Link to={`topic/${topic.title}`}>
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

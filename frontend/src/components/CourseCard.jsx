/* eslint-disable react/prop-types */
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { API_URL } from "@/config";
import axios from "axios";
import { SlLike, SlDislike } from "react-icons/sl";

// eslint-disable-next-line react/prop-types
export default function CourseCard({ course }) {
  const { token, user } = useContext(AppContext);
  const [courseComments, setCourseComments] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(course.courseUpvoteCount || 0);
  const [downvoteCount, setDownvoteCount] = useState(
    course.courseDownvoteCount || 0
  );
  const [comment, setComment] = useState({
    content: "",
  });

  const fetchAllCourseComments = async () => {
    var options = {
      method: "GET",
      url: `${API_URL}/comment/on/course/${course.id || course.courseId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        setCourseComments(data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleUpvoteCourse = async (e) => {
    e.preventDefault();

    if (hasVoted === "UPVOTE") {
      toast.error("You have already voted on this course!");
      return;
    }

    const options = {
      method: "POST",
      url: `${API_URL}/vote/course/${course.id || course.courseId}`,
      params: { voteType: "UPVOTE" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        console.log(response.data);
        if (data.status == 200) {
          toast("You upvoted a post...");
          // Update the local upvote and downvote counts
          setUpvoteCount((prev) => prev + 1);

          if (hasVoted === "DOWNVOTE") {
            setDownvoteCount((prev) => Math.max(prev - 1, 0)); // Reduce downvote count if previously downvoted
          }

          setHasVoted("UPVOTE"); // Mark as upvoted
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setRefetch((prev) => prev + 1);
      });
  };

  const handleDownvoteCourse = async (e) => {
    e.preventDefault();

    if (hasVoted === "DOWNVOTE") {
      toast.error("You have already downvoted this course!");
      return;
    }

    const options = {
      method: "POST",
      url: `${API_URL}/vote/course/${course.id || course.courseId}`,
      params: { voteType: "DOWNVOTE" },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        console.log(response.data);
        if (data.status == 200) {
          toast("You downvoted a post...");

          // Update the local downvote and upvote counts
          setDownvoteCount((prev) => prev + 1);

          if (hasVoted === "UPVOTE") {
            setUpvoteCount((prev) => Math.max(prev - 1, 0)); // Reduce upvote count if previously upvoted
          }

          setHasVoted("DOWNVOTE"); // Mark as downvoted
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setRefetch((prev) => prev + 1);
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    var options = {
      method: "POST",
      url: `${API_URL}/comment/on/course/${course.id || course.courseId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: comment,
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.status) {
          setCourseComments((prev) => [data.result, ...prev]);
          setComment({ content: "" });
          toast.success("Comment added successfully");
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => {
        setRefetch((prev) => prev + 1);
      });
  };

  useEffect(() => {
    fetchAllCourseComments();
  }, [refetch]);
  return (
    <>
      <div className="mt-10 max-w-5xl rounded-md shadow p-8 mx-auto bg-white grid grid-cols-3 gap-x-5 items-center">
        <div className="h-48">
          <img
            className="w-full h-full rounded-md object-cover"
            src={course.imageUrl}
            alt=""
          />
        </div>
        <div className="col-span-2 space-y-4">
          <Link to={`/course/${course.courseId || course.id} `}>
            <h1 className="uppercase text-2xl font-bold font-montserrat">
              {(course.courseTitle && course.courseTitle) || course?.title}
            </h1>
          </Link>
          <p className="text-slate-600 leading-7">
            {(course.courseDescription && course.courseDescription.length > 200
              ? `${course.courseDescription.slice(0, 200)}...`
              : course.courseDescription) ||
              (course.description && course.description.length > 150
                ? `${course.description.substring(0, 150)}...`
                : course.description)}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-x-3">
              <p className="flex gap-x-4 items-center">
                <form action="" onSubmit={handleUpvoteCourse}>
                  <button
                    className="cursor-pointer flex items-center gap-2"
                    type="submit"
                  >
                    <SlLike size={26} />
                    {upvoteCount}
                  </button>
                </form>
                <form action="" onSubmit={handleDownvoteCourse}>
                  <button
                    className="cursor-pointer flex items-center gap-2"
                    type="submit"
                  >
                    <SlDislike size={26} />
                    {downvoteCount}
                  </button>
                </form>
              </p>
              <span>
                <Sheet>
                  <SheetTrigger className="flex items-center gap-x-1 cursor-pointer">
                    <p className="flex gap-x-1 items-center">
                      <FaRegComment size={20} />
                      {course.courseCommentCount ||
                        (course.comments && course?.comments.length)}
                    </p>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>Responses</SheetHeader>
                    <SheetDescription className={"px-4 h-full overflow-y-auto"}>
                      <div>
                        <div className="flex items-center gap-x-2">
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="text-sm font-bold font-montserrat flex flex-col">
                              <span>{user.username}</span>
                              <span className="text-blue-500 text-xs font-normal -mt-1">
                                {/* @{user && user.username} */}
                              </span>
                            </h1>
                          </div>
                        </div>

                        <form
                          action=""
                          onSubmit={handleAddComment}
                          className="my-8"
                        >
                          <Textarea
                            placeholder="What are your thoughts"
                            onChange={(e) =>
                              setComment({ content: e.target.value })
                            }
                          />
                          <Button className="mt-2 cursor-pointer">
                            Comment
                          </Button>
                        </form>

                        <div className="flex flex-col gap-y-4 ">
                          {courseComments.map((comment, index) => (
                            <div key={index}>
                              <div className="flex items-center gap-x-2">
                                <Avatar>
                                  <AvatarImage src={comment.profilePicture} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h1 className="text-xs font-bold font-poppins capitalize">
                                    {comment.username}
                                  </h1>
                                  <p className="text-xs">{comment.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetContent>
                </Sheet>
              </span>
            </div>
            <p className="flex gap-x-3">
              <span className="bg-slate-800 rounded-full text-white px-3 text-sm font-medium py-0.5 ">
                {course.courseTopicCount ||
                  (course.topics && course?.topics.length)}{" "}
                topics
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

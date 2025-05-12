/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { FaRegComment } from "react-icons/fa";
import { SlDislike, SlLike } from "react-icons/sl";

export default function CourseCard2({ course }) {
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
    <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
      <div className="relative">
        <Link to={`/course/${course.courseId || course.id} `}>
          <img
            src={course.imageUrl}
            alt="Course"
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute bottom-4 right-4">
          <Link to={`/course/${course.courseId || course.id} `}>
            <Button
              variant="default"
              className="bg-blue-800 cursor-pointer hover:bg-blue-900 text-white text-xs"
            >
              Start Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-blue-600">{course.courseTopicCount} Topics</h3>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800 mt-1 text-sm">
            {(course.courseTitle && course.courseTitle) || course?.title}
          </p>
        </div>
        <p className="text-gray-600 text-sm">
          {(course.courseDescription &&
            course.courseDescription.substring(0, 20)) ||
            (course.description && course.description.substring(0, 150))}
          ...
        </p>

        {/* Stats Section */}
        <div className="flex items-center justify-between mt-4 text-gray-500 text-sm px-2">
          <div className="flex items-center gap-1">
            <p className="flex gap-x-4 items-center">
              <form action="" onSubmit={handleUpvoteCourse}>
                <button
                  className="cursor-pointer flex items-center gap-2"
                  type="submit"
                >
                  <SlLike className="fill-black" />
                  {upvoteCount}
                </button>
              </form>
              <form action="" onSubmit={handleDownvoteCourse}>
                <button
                  className="cursor-pointer flex items-center gap-2"
                  type="submit"
                >
                  <SlDislike className="fill-red-500" />
                  {downvoteCount}
                </button>
              </form>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Sheet>
              <SheetTrigger className="flex items-center gap-x-1 cursor-pointer">
                <p className="flex gap-x-1 items-center">
                  <FaRegComment  />
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
                      <Button className="mt-2 cursor-pointer">Comment</Button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

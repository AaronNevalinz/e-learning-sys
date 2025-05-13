import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewAllCourses from "@/components/view-all-courses";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
import axios from "axios";
import { toast } from "sonner";

export default function CourseDetail() {
  const { id } = useParams();
  const { token, user, userCourses, fetchUserCourses } = useContext(AppContext);
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

  // Directly check if the current course ID exists in the userCourses array
  const isEnrolled = userCourses?.some(
    (enrolledCourse) =>
      (enrolledCourse.courseId || enrolledCourse.id) === parseInt(id)
  );

  const fetchCourseDetails = async () => {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.status === 200) {
      setCourse(data.result);
    }
  };

  const enrolInCourse = (courseId) => {
    var options = {
      method: "POST",
      url: `${API_URL}/enrollments/${user.id}/enroll/${courseId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        if (data.status == 200) {
          toast.success("Congrats, you've enrolled in the course!");
          navigate(`/course/${course.title}/topic/${courseId}`);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
        // Optionally handle enrollment failure
      });
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id, token]); //Re-fetch course details if the ID or token changes

  useEffect(() => {
    if (!userCourses || userCourses.length === 0) {
      fetchUserCourses();
    }
  }, [userCourses]);

  return (
    <>
      <div className="lg:grid md:grid-cols-6 gap-x-6 px-4 md:px-8">
        <div className="col-span-2 w-full mb-5 h-44 lg:h-72">
          <img
            src={course.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-4">
          <ViewAllCourses />
          <h1 className="uppercase text-4xl font-extrabold text-slate-800 font-montserrat">
            {course.title}
          </h1>
          <p className="text-slate-600 my-2 leading-7">
            {course.description && course.description.substring(0, 250)} ...
          </p>
          <div className="flex gap-x-5 mt-4">
            {isEnrolled ? (
              <Link to={`/course/${course.title}/topic/${id}`}>
                <Button
                  variant={"outline"}
                  className={
                    "bg-[#2d277b] rounded-none text-slate-100 hover:text-slate-100 cursor-pointer hover:bg-[#123524]"
                  }
                >
                  <FaPlay />
                  Continue Course
                </Button>
              </Link>
            ) : (
              <Button
                variant={"outline"}
                className={
                  "bg-[#3E7B27] rounded-none text-slate-100 hover:text-slate-100 cursor-pointer hover:bg-[#123524]"
                }
                onClick={() => enrolInCourse(parseInt(id))}
              >
                <FaPlay />
                Start Course
              </Button>
            )}
          </div>

          <div>
            <div className="border-gray-200 border py-2 text-xl px-2 mt-4 font-montserrat font-bold text-slate-700 uppercase">
              Topics
            </div>
            <div className="space-y-4 mt-4">
              {(course.topics || []).map((topic, index) => (
                <div
                  className="bg-gray-100 shadow-sm md:grid grid-cols-12 items-center gap-x-1 p-2"
                  key={topic.id}
                >
                  <div className="col-span-1 w-full justify-center">
                    <p className="text-4xl font-black bg-slate-400 w-10 flex justify-center  rounded-full">
                      {index + 1}
                    </p>
                  </div>
                  <div className="col-span-11">
                    <h1 className="text-xl font-medium">{topic.title}</h1>
                    <p className="text-gray-600 text-sm">{topic.description}</p>
                    <div className="flex justify-end">
                      <p className="flex items-center px-2 py-0.5 gap-x-1 text-sm bg-orange-600 text-gray-100">
                        <IoNewspaperOutline />
                        <span className="text-xs">Take Exam</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

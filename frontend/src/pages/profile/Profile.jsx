import CourseCard from "@/components/CourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppContext } from "@/context/AppContext";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user,fetchUserCourses, userCourses } = useContext(AppContext);
  
  useEffect(()=>{
    fetchUserCourses()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-[#0F1629] text-white p-6 self-start">
        <div className="flex flex-col items-center">
          <Avatar className={"size-32 mb-10"}>
            <AvatarImage
              className={"cursor-pointer"}
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button className="bg-[#2B334D] text-white px-4 py-1 text-sm rounded mb-4">
            Follow Me
          </button>
          <h2 className="text-xl font-bold">{user?.username}</h2>
          <div className="text-sm mt-4 space-y-2">
            <p>
              <span className="text-gray-400">Member Since:</span> 2 days ago
            </p>
            <p>
              <span className="text-gray-400">Total XP:</span> 100
            </p>
            <p>
              <span className="text-gray-400">Lessons Completed:</span> 1
            </p>
            <p>
              <span className="text-gray-400">Best Reply Awards:</span> 0
            </p>
          </div>
          <button className="mt-6 bg-[#2B334D] px-4 py-1 rounded text-sm">
            Edit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* XP Progress Bar */}
        <div className="flex items-center mb-6">
          <span className="text-xs mr-2">LEVEL 1</span>
          <div className="flex-1 h-2 bg-gray-800 rounded">
            <div className="h-2 bg-blue-500 rounded w-1/5"></div>
          </div>
          <span className="text-xs ml-2">MAX 200</span>
        </div>

        {/* Bio and Discussion */}
        <p className="text-gray-700 mb-4 italic text-sm">
          This is your optional bio. Right now, only you can see it...
        </p>

        <h3 className="text-xl font-semibold mb-4">
          Courses Enrolled in ({userCourses?.length})
        </h3>


       {
        userCourses?.map(course=>{
          return (
            <CourseCard course={course} key={course.id || course.courseId} />
          )
        })
       }

        <Link to={"/courses"}>
          <button className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
            Enroll new Course
          </button>
        </Link>
      </div>
    </div>
  );
}

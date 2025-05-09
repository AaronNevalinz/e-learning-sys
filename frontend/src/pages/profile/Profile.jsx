import ProfileCourseCard from "@/components/ProfileCourseCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppContext } from "@/context/AppContext";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user,fetchUserCourses, userCourses } = useContext(AppContext);


  
  useEffect(()=>{
    fetchUserCourses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen text-black flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-[#0F1629] text-white rounded-2xl p-6 self-start">
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

        <h3 className="text-xl font-semibold mb-4">
          Courses Enrolled in ({userCourses?.length})
        </h3>

        <div className="grid grid-cols-2 gap-8">
          {userCourses?.map((course) => {
            return (
              <ProfileCourseCard
                course={course}
                key={course.id || course.courseId}
              />
            );
          })}
        </div>

        <Link to={"/courses"}>
          <button className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
            Enroll new Course
          </button>
        </Link>
      </div>
    </div>
  );
}

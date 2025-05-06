import { Button } from "@/components/ui/button";
import oopPhp from "../../assets/images/oop-in-php.jpg";
import { FaPlay } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import ViewAllCourses from "@/components/view-all-courses";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { API_URL } from "@/config";
export default function CourseDetail() {
  const {id} = useParams()
  const {token} = useContext(AppContext)
  const [course, setCourse] = useState({})
  const fetchCourseDetails = async()=>{
    const res = await fetch(`${API_URL}/courses/${id}`, {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    });
    const data = await res.json()

    if(data.status === 200){
      setCourse(data.result)      
    }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  
  return (
    <>
      <div className="grid grid-cols-6 gap-x-6">
        <div className="col-span-2 w-full h-72">
          <img src={oopPhp} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-4">
          <ViewAllCourses />
          <h1 className="uppercase text-6xl font-black text-slate-800 font-montserrat">
            {course.title}
          </h1>
          <p className="text-slate-600 my-2 leading-7">
            {course.description}
          </p>
          <div className="flex gap-x-5 mt-4">
            <Button
              variant={"outline"}
              className={
                "border-orange-500 rounded-none cursor-pointer text-orange-500"
              }
            >
              <FaBookBookmark />
              Add to watchlist
            </Button>
            <Link to={`/course/${course.title}/topic/${course.id}`}>
              <Button
                variant={"outline"}
                className={
                  "bg-[#3E7B27] rounded-none text-slate-100 hover:text-slate-100 cursor-pointer hover:bg-[#123524]"
                }
              >
                <FaPlay />
                Start Course
              </Button>
            </Link>
          </div>

          <div>
            <div className="border-gray-200 border py-2 text-xl px-2 mt-4 font-montserrat font-bold text-slate-700 uppercase">
              Topics
            </div>
            <div className="space-y-4 mt-4">
              {
              (course.topics || []).map((topic, index) => (
                <div
                  className="bg-gray-100 shadow-sm grid grid-cols-12 items-center gap-x-1 p-2"
                  key={topic.id}
                >
                  <div className="col-span-1 w-full justify-center">
                    <p className="text-4xl font-black bg-slate-400 w-10 flex justify-center  rounded-full">
                      {index+1}
                    </p>
                  </div>
                  <div className="col-span-11">
                    <h1 className="text-xl font-medium">{topic.title}</h1>
                    <p className="text-gray-600 text-sm">
                      {topic.description}
                    </p>
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

import CourseCard from "@/components/CourseCard";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";

export default function CourseList() {
  const {token} = useContext(AppContext)
  const [courses, setCourses] = useState([])
  const fetchAllCourses = async ()=>{
    const res = await fetch(`${API_URL}/courses`, {
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    })
    const data = await res.json()

    if(data.status === 200){
      setCourses(data.result)
    }

  }

  useEffect(()=>{
    fetchAllCourses()
  }, [])


  return (
    <>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <CourseCard course={course} key={index}/>
        ))}
      </div>
    </>
  );
}

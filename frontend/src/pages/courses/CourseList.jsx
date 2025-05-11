import CourseCard from "@/components/CourseCard";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import notFound from "../../../public/monster-pixelized.svg";
import CourseCard2 from "@/components/CourseCard2";
import SidebarComponent from "@/components/SideBarComponent";

export default function CourseList() {
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        const publishedCourses = data.result.filter(
          (course) => course.published === true
        );
        setCourses(publishedCourses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading Courses...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="lg:fixed hidden lg:block top-20 left-24 h-ful w-64 bg-gray-100 shadow-md">
        <SidebarComponent />
      </div>
      <div className="lg:ml-64 flex-1 p-8">
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index}>
                {/* <CourseCard course={course} key={index} /> */}
                <CourseCard2 course={course} />
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col w-full h-screen justify-center items-center text-center">
                <div>
                  <p className="text-xl font-bold italic">
                    {loading
                      ? "Loading courses..."
                      : "No published courses found 😩"}
                  </p>
                  {!loading && <img src={notFound} alt="" />}
                </div>
              </div>
            </>
          )}
          {/* <CourseCard2 course={1} />
          <CourseCard2 />
          <CourseCard2 />
          <CourseCard2 />
          <CourseCard2 />
          <CourseCard2 />
          <CourseCard2 />
          <CourseCard2 /> */}
        </div>

        {/* <div className="space-y-4 mt-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <>
                <CourseCard course={course} key={index} />
                <CourseCard2 course={course} />
              </>
            ))
          ) : (
            <>
              <div className="flex flex-col w-full h-screen justify-center items-center text-center">
                <div>
                  <p className="text-xl font-bold italic">
                    {loading
                      ? "Loading courses..."
                      : "No published courses found 😩"}
                  </p>
                  {!loading && <img src={notFound} alt="" />}
                </div>
              </div>
            </>
          )}
        </div> */}
      </div>
    </div>
  );
}

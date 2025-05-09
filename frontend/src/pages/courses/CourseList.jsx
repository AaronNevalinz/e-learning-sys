import CourseCard from "@/components/CourseCard";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import notFound from "../../../public/monster-pixelized.svg";

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
    <>
      <div className="space-y-4">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard course={course} key={index} />
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
      </div>
    </>
  );
}

import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import notFound from "../../../public/monster-pixelized.svg";
import CourseCard2 from "@/components/CourseCard2";


export default function CourseList() {
  const { token, user } = useContext(AppContext);
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
  const fetchCoursesByTagId = () => {
    var options = {
      method: "GET",
      url: `${API_URL}/courses/category/2`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllCourses();
    fetchCoursesByTagId();
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
      <div className=" flex-1 p-4">
        <h1 className="mb-5 text-lg font-semibold">All Courses...</h1>
        <div className="grid grid-cols-5 gap-5">

          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index}>
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
        </div>
      </div>
    </>
  );
}

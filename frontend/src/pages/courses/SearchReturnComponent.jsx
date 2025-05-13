import CourseCard2 from "@/components/CourseCard2";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchReturnComponent() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);

  const searchCourses = () => {
    var options = {
      method: "GET",
      url: `${API_URL}/courses/search`,
      params: { keyword: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        console.log(data.result);
        // setCourses(data.result)
        setCourses(data.result.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (courses) {
      console.log(courses);
    }
    searchCourses();
  }, [query]);

  return (
    <div className="mt-4 px-4">
      <div>
        <h1 className="text-4xl font-semibold">Results for: {query}</h1>
      </div>
      <div className="mt-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
          {courses && courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index}>
                {/* <CourseCard course={course} key={index} /> */}
                <CourseCard2 course={course} />
              </div>
            ))
          ) : (
            <>
              <div className="flex w-full h-[60vh] justify-center items-center text-center">
                {/* <div> */}
                <p className="text-xl font-bold italic">
                  No published courses found 😩
                </p>
                {/* </div> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

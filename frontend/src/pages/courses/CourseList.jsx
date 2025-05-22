import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import notFound from "../../../public/monster-pixelized.svg";
import CourseCard2 from "@/components/CourseCard2";
import axios from "axios";

export default function CourseList() {
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAllCourses = async () => {
    setLoading(true);
    // try {
    //   const res = await fetch(`${API_URL}/courses`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await res.json();

      // if (data.status === 200) {
      //   const publishedCourses = data.result.filter(
      //     (course) => course.published === true
      //   );
      //   setCourses(publishedCourses);
      // } else {
      //   setCourses([]);
      // }
    // } catch (error) {
    //   console.error("Error fetching courses:", error);
      // setCourses([]);
    // } finally {
    //   setLoading(false);
    // }
    // var axios = require("axios").default;

    var options = {
      method: "GET",
      url: "http://localhost:8000/api/v1/courses/paginated",
      params: { page: `${page}`, size: "10" },
      headers: {
        Authorization:`Bearer ${token}`
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        const data = response.data
        setTotalPages(data.result.totalPages)
        console.log(totalPages);
        // setPage(data.result)
        
        if (data.status === 200) {
          const publishedCourses = data.result.courses.filter(
            (course) => course.published === true
          );
          setCourses(publishedCourses);
        } else {
          setCourses([]);
        }
      })
      .catch(function (error) {
        console.error(error);
        setCourses([]);
      }).finally(() => {
        setLoading(false);
      });
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
    // fetchCoursesByTagId();
  }, [page]);
  useEffect(() => {
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
    <div className="flex px-10">
      <div className="flex-1 p-4">
        <h1 className="mb-5 text-lg font-semibold">All Courses...</h1>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index}>
                <CourseCard2 course={course} />
              </div>
            ))
          ) : (
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
          )}
        </div>
        <p className="text-center mt-8 text-sm font-bold">Lord More</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
              page === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous page"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="px-3 py-1 rounded-md text-sm font-medium bg-muted text-muted-foreground border border-input">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Next page"
          >
            <span className="sr-only">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

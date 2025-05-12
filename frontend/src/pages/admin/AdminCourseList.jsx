import CoursesTable from "@/components/CoursesTable";
import { API_URL } from "@/config";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function AdminCourseList() {
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);

  const fetchAllCourses = () => {
    const options = {
      method: "GET",
      url: `${API_URL}/courses`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        setCourses(data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold">List of all the courses</h1>
        <CoursesTable courses={courses} />
      </div>
    </div>
  );
}

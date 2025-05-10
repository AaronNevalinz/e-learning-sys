import { IoDocumentTextOutline, IoAdd } from "react-icons/io5";
import DashboardCardAction from "@/components/dashboard-card-action";
import { Separator } from "@/components/ui/separator";
import IssuedContentCard from "@/components/IssuedContentCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { API_URL } from "@/config";
import axios from "axios";
import CoursesTable from "@/components/CoursesTable";

export default function Dashboard() {
  const { token } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastFiveCourses, setLastFiveCourses] = useState([]);
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // this part is for tags all all that database related
  const [newTag, setNewTag] = useState({
    name: "",
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTag),
  };
  const handleAddTag = async (e) => {
    e.preventDefault();
    console.log(API_URL);

    try {
      const res = await fetch(`${API_URL}/categories`, options);
      const data = await res.json();
      if (data.status == 201) {
        toast.success("Tag added Successfully");
      } else {
        toast.error("Error Occurred creating Tag");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

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
        const lastFiveCourses = data.result.slice(-5); // Get the last 5 courses
        setLastFiveCourses(lastFiveCourses);
        setCourses(data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchAllUsers = () => {
    var options = {
      method: "GET",
      url: `${API_URL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;
        console.log(data);

        setUsers(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllCourses();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-xl font-bold">{getGreeting()}, Aaron👋</h1>
        <div className="flex h-6 my-8 items-center text-xl space-x-6">
          {/* <DashboardCardAction
            color="#ffe600"
            action="course"
            icon={<IoDocumentTextOutline />}
          /> */}
          <div className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2">
            <div
              className={`bg-[#eedf2e] text-black rounded-[3px] p-0.5 -ml-1`}
            >
              <IoDocumentTextOutline />
            </div>
            <span className="uppercase">course</span>
            <IoAdd />
          </div>
          <Separator orientation="vertical" />
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              <div className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2">
                <div
                  className={`bg-[#dc4838] text-white rounded-[3px] p-0.5 -ml-1`}
                >
                  <IoDocumentTextOutline />
                </div>
                <span className="uppercase">Tags</span>
                <IoAdd />
              </div>
            </DialogTrigger>
            <DialogContent>
              <div className="mt-6 space-y-4">
                <h1 className="uppercase font-medium">Add Tag</h1>
                <form
                  action=""
                  className="flex items-center gap-x-6"
                  onSubmit={handleAddTag}
                >
                  <Input
                    type={"text"}
                    className={"rounded-none"}
                    placeholder="Add Tag"
                    onChange={(e) => setNewTag({ name: e.target.value })}
                  />
                  <Button
                    type="submit"
                    className={"cursor-pointer rounded-none"}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
          <DashboardCardAction
            color="#ffe600"
            action="View Tags"
            icon={<IoDocumentTextOutline />}
          />
        </div>

        <div className="grid grid-cols-2 mr- gap-8">
          <IssuedContentCard
            count={courses.length}
            title="Total Courses"
            link="see all course"
          />
          <IssuedContentCard
            count={users.length}
            title="Total Users"
            link="see all users"
          />
        </div>

        <div className="mt-5">
          <CoursesTable courses={lastFiveCourses} />
        </div>
      </div>
    </>
  );
}

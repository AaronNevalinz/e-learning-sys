import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { DialogContent } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { API_URL } from "@/config";
import { IoLogOutSharp } from "react-icons/io5";
import axios from "axios";

export default function AdminDashboardNavbar() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const [tags, setTags] = useState([]);
  const [course, setCourse] = useState({
    title: "",
    description: "",
  });

  const fetchAllTags = async () => {
    const res = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.status == 200) {
      setTags(data.result);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "course",
      new Blob([JSON.stringify(course)], {
        type: "application/json",
      })
    );

    axios
      .post(`${API_URL}/courses`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data
        if(data.status == 201){
          setOpen(false);
              toast.success("Course Created Successfully...");
              navigate("/dashboard/create-course", {
                state: { course: data.result },
              });
        }else{
          toast.error("an error occured...");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    setToken(null);
    localStorage.removeItem("token");
    navigate("/dashboard");
  };
  useEffect(() => {
    fetchAllTags();
  }, []);
  return (
    <div>
      <nav className="flex justify-between gap-x-30 bg-white items-center mx-auto py-4 px-4 shadow-md">
        <SidebarTrigger className={"cursor-pointer"} />
        <Input className={"py-1"} placeholder="search courses here..." />
        {token ? (
          <div className="flex items-center gap-x-3 text-sm">
            <div>
              <form action="" onSubmit={handleLogOut}>
                <Button
                  variant={"outline"}
                  type="sumbit"
                  className={"flex justify-between cursor-pointer border"}
                >
                  Logout
                  <IoLogOutSharp className="size-5 fill-black" />
                </Button>
              </form>
            </div>
            <Dialog className="" open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button className={"text-sm rounded-none cursor-pointer"}>
                  Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className={"w-"}>
                <form
                  action=""
                  className="mt-4 space-y-4"
                  onSubmit={handleCourseSubmit}
                >
                  <div>
                    <Label>Course Title</Label>
                    <Input
                      className={"mt-2"}
                      placeholder="Enter the Course Title"
                      onChange={(e) =>
                        setCourse({ ...course, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select category
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        const selectedTag = tags.find(
                          (tag) => tag.id === parseInt(e.target.value)
                        );
                        if (!selectedTag) return;
                        setCourse({
                          ...course,
                          categoryId: selectedTag.id,
                        });
                      }}
                    >
                      <option value="">Select a Category</option>
                      {tags.map((tag) => (
                        <option
                          key={tag.id}
                          value={tag.id}
                          className="uppercase"
                        >
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Course Image</Label>
                    <Input className={"mt-2"} type={"file"} onChange={handleFileChange} />
                  </div>
                  <div>
                    <Label>Course Description</Label>
                    <Textarea
                      onChange={(e) =>
                        setCourse({ ...course, description: e.target.value })
                      }
                      className={"mt-2"}
                      placeholder={"Enter Course Description "}
                    />
                  </div>
                  <Button
                    className={"cursor-pointer rounded-none"}
                    type="submit"
                  >
                    Add Course
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <Button
                variant={"outline"}
                className={
                  "border-[#3E7B27] outline cursor-pointer rounded-none"
                }
              >
                SIGN IN
              </Button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

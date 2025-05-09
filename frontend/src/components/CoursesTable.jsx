import { useState, useMemo, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_URL } from "@/config";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
const CoursesTable = ({ courses }) => {
  const {token} = useContext(AppContext)
  const [sortConfig, setSortConfig] = useState(null);
  const [open, setOpen] = useState(false);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = useMemo(() => {
    let sortableItems = [...courses];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [courses, sortConfig]);

  const handleDeleteCourse = (e,id) => {
    e.preventDefault()
    var options = {
      method: "DELETE",
      url: `${API_URL}/courses/delete/course/${id}`,
      headers: {
        Authorization:`Bearer ${token}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setOpen(false); // Close dialog after submit
        const data = response.data
        if(data.status == 200){
          toast.success("Course deleted successfully");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="w-full">
      <Table className="border rounded-xl shadow-lg">
        {" "}
        {/* Increased roundedness and shadow */}
        <TableCaption className="text-gray-500 dark:text-gray-400 mt-4">
          A list of your recent Courses.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-left">
              <Button
                variant="ghost"
                className="h-9 p-0 font-bold uppercase text-gray-900 dark:text-white" // Make header text bold
                onClick={() => requestSort("courseId")}
              >
                SN
                {sortConfig?.key === "courseId" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                className="h-9 p-0 font-bold uppercase text-gray-900 dark:text-white"
                onClick={() => requestSort("courseTitle")}
              >
                Course Name
                {sortConfig?.key === "courseTitle" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                className="h-9 p-0 font-bold uppercase text-gray-900 dark:text-white"
                onClick={() => requestSort("courseTopicCount")}
              >
                Total Topics
                {sortConfig?.key === "courseTopicCount" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead className="font-bold uppercase">Status</TableHead>
            <TableHead className="">
              <Button
                variant="ghost"
                className="h-9 p-0 font-bold uppercase text-gray-900 dark:text-white"
                onClick={() => requestSort("createdAt")}
              >
                Created At
                {sortConfig?.key === "createdAt" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </TableHead>
            <TableHead className="uppercase font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCourses.map((course, index) => (
            <TableRow
              key={course.courseId}
              className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors"
            >
              {" "}
              {/* Improved hover effect */}
              <TableCell className="font-medium text-gray-900 dark:text-white">
                {index + 1}
              </TableCell>{" "}
              {/* Bold and dark text */}
              <TableCell className="text-gray-900 dark:text-white">
                {course.courseTitle}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-white">
                {course.courseTopicCount}
              </TableCell>
              <TableCell>
                <Badge
                  variant={course.published ? "success" : "secondary"}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold shadow-md", // Added shadow
                    course.published
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" // Added border
                      : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  )}
                >
                  {course.published ? "Published" : "In Progress"}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">
                {new Date(course.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </TableCell>
              <TableCell className="flex items-center gap-x-3">
                {course.isPublished ? (
                  <Link to={`/courses/${course.courseId}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Course"
                      className="hover:bg-blue-500/20 text-blue-400" // Styled hover
                    >
                      <Eye className="h-5 w-5" /> {/* Increased icon size */}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard/create-course"
                    state={{ course: course }}
                    title="Continue Editing Course"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-orange-500/20 cursor-pointer text-orange-400"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  </Link>
                )}

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500/50 cursor-pointer text-red-500"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="text-center text-sm mt-4">
                      <p>Are you sure you wanna delete this</p>
                      <p>Mind you there is no going back</p>
                    </div>
                    <div className="flex justify-center gap-x-4">
                      <DialogClose>
                        <Button size={"sm"} className={"cursor-pointer"}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <form
                        action=""
                        onSubmit={(e) => handleDeleteCourse(e, course.courseId)}
                      >
                        <Button
                          size={"sm"}
                          variant={"destructive"}
                          className={"bg-red-700 cursor-pointer"}
                          type="submit"
                        >
                          Delete
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;

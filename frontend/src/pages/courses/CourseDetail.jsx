import { Button } from "@/components/ui/button";
import oopPhp from "../../assets/images/oop-in-php.jpg";
import { FaPlay } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ViewAllCourses from "@/components/view-all-courses";
export default function CourseDetail() {
  return (
    <>
      <div className="grid grid-cols-6 gap-x-6">
        <div className="col-span-2 w-full h-72">
          <img src={oopPhp} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-4">
          <ViewAllCourses />
          <h1 className="uppercase text-6xl font-black text-slate-800 font-montserrat">
            Object-Oriented Principles in PHP
          </h1>
          <p className="text-slate-600 my-2 leading-7">
            Core OOP concepts: for most people; like encapsulation, inheritance,
            and polymorphism can be confusing at first, especially for those
            used to procedural code where data and logic are not grouped
            together. Beginners often find it challenging to determine which
            parts of their application should be modeled as classes, what
            responsibilities each class should have, and how objects should
            interact. In this course, you will be introduced to the core
            principles of object-oriented programming through the lens of PHP.
            We will begin with the basic constructs and work our way up. The
            only prerequisite is an elementary understanding of the PHP language
            and syntax. Now, walk with me…
          </p>
          <div className="flex gap-x-5 mt-4">
            <Button
              variant={"outline"}
              className={
                "border-orange-500 rounded-none cursor-pointer text-orange-500"
              }
            >
              <FaBookBookmark />
              Add to watchlist
            </Button>
            <Link to={"/course/Object-Oriented Principles in PHP/topic/1"}>
              <Button
                variant={"outline"}
                className={
                  "bg-[#3E7B27] rounded-none text-slate-100 hover:text-slate-100 cursor-pointer hover:bg-[#123524]"
                }
              >
                <FaPlay />
                Start Course
              </Button>
            </Link>
          </div>

          <div>
            <div className="border-gray-200 border py-2 text-xl px-2 mt-4 font-montserrat font-bold text-slate-700 uppercase">
              Topics
            </div>
            <div className="space-y-4 mt-4">
              {[1, 1, 1, 1, 1, 1].map((index) => (
                <div
                  className="bg-gray-100 shadow-sm grid grid-cols-12 items-center gap-x-1 p-2"
                  key={index}
                >
                  <div className="col-span-1 w-full justify-center">
                    <p className="text-4xl font-black bg-slate-400 w-10 flex justify-center  rounded-full">
                      1
                    </p>
                  </div>
                  <div className="col-span-11">
                    <h1 className="text-xl font-medium">Classes</h1>
                    <p className="text-gray-600 text-sm">
                      Lets begin with an introduction to classes in PHP. I like
                      to think of a class as a blueprint or template that
                      defines the overall structure and behavior for an concept
                      in your codebase.
                    </p>
                    <div className="flex justify-end">
                      <p className="flex items-center px-2 py-0.5 gap-x-1 text-sm bg-orange-600 text-gray-100">
                        <IoNewspaperOutline />
                        <span className="text-xs">Take Exam</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* eslint-disable react/prop-types */
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import oopPhp from "../assets/images/oop-in-php.jpg";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CourseCard({course}) {
  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-x-5 items-center">
        <div className="h-56">
          <img className="w-full h-full object-cover" src={oopPhp} alt="" />
        </div>
        <div className="col-span-2 space-y-4">
          <Link to={`/course/${course.courseId}`}>
            <h1 className="uppercase text-4xl font-bold font-montserrat">
              {course.courseTitle}
            </h1>
          </Link>
          <p className="text-slate-600 leading-7">{course.courseDescription}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-x-3">
              <p className="flex gap-x-1 items-center">
                <BiUpvote size={20} /> {course.courseUpvoteCount}
              </p>
              <p className="flex gap-x-1 items-center">
                <FaRegComment size={20} />
                {course.courseCommentCount}
              </p>
            </div>
            <p className="flex gap-x-3">
              <span className="bg-[#3E7B27] text-white px-1.5 text-sm font-medium py-0.5 ">
                {course.courseTopicCount} topics
              </span>
              <span className="bg-[#3E7B27] text-white px-1.5 text-sm font-medium py-0.5 ">
                {course.courseSubtopicCount} subtopics
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

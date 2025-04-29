import { BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import oopPhp from "../assets/images/oop-in-php.jpg";
import { Link } from "react-router-dom";

export default function CourseCard() {
  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-x-5 items-center">
        <div className="h-56">
          <img className="w-full h-full object-cover" src={oopPhp} alt="" />
        </div>
        <div className="col-span-2 space-y-4">
          <Link to={"/course/Object-Oriented Principles in PHP"}>
            <h1 className="uppercase text-4xl font-bold">
              Object-Oriented Principles in PHP
            </h1>
          </Link>
          <p>
            The typical beginner, whether they realize it or not, first learns
            procedural programming. But, before too long, they level up.
            Suddenly, an entirely different paradigm is introduced:
            object-oriented programming. Little do they know that they will
            spend years researching and learning exactly what it means to work
            with objects and messages.....
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-x-3">
              <p className="flex gap-x-1 items-center">
                <BiUpvote size={20} /> 30
              </p>
              <p className="flex gap-x-1 items-center">
                <FaRegComment size={20} />
                30
              </p>
            </div>
            <p className="flex gap-x-3">
              <span className="bg-[#3E7B27] text-white px-1.5 text-sm font-medium py-0.5 ">
                11 topics
              </span>
              <span className="bg-[#3E7B27] text-white px-1.5 text-sm font-medium py-0.5 ">
                25 subtopics
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

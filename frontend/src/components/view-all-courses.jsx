import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ViewAllCourses() {
  return (
    <div className="inline-block items-center gap-x-1 bg-orange-600">
      <Link to={"/courses"}>
        <div className="flex items-center gap-x-1 px-4 text-sm text-slate-200">
          <MdOutlineKeyboardDoubleArrowLeft /> Browser all courses
        </div>
      </Link>
    </div>
  );
}

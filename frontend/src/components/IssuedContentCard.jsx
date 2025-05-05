import DashboardCardAction from "./dashboard-card-action";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function IssuedContentCard() {
  return (
    <>
      <div
        className="border border-gray-300 px-4 rounded-md
       py-2 space-y-4 self-start shadow-lg"
      >
        <div className="text-sm  justify-between flex">
          <p className="font-medium">Most issued content</p>
          <p className="text-xs text-slate-500">This week</p>
        </div>
        <div>
          <div>
            <DashboardCardAction
              color="#ffe600"
              action="Course"
              icon={<IoDocumentTextOutline />}
            />
          </div>
          <p className="text-sm ">OOP in php...</p>
        </div>
        <Link
          to={"/admin/courses"}
          className="text-xs flex items-center justify-between hover:underline"
        >
          <span>See all issued content</span>
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
    </>
  );
}

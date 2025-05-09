import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

// eslint-disable-next-line react/prop-types
export default function IssuedContentCard({count, title, link}) {
  return (
    <>
      <div
        className="border border-gray-700 px-4 rounded-md
       py-2 space-y-4 self-start shadow-lg"
      >
        <div className="text-sm items-center justify-between flex">
          <p className="font-medium text-lg">{title}</p>
          <p className="text-xs text-slate-200 px-2 py-0.5 rounded-full bg-pink-800 inline-block">over-all</p>
        </div>
        <div>
          <p className="text-3xl">{count}</p>
        </div>
        <Link
          to={"/admin/courses"}
          className="text-xs flex items-center gap-x-2 hover:underline"
        >
          <span className="font-bold capitalize">{link}</span>
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
    </>
  );
}

/* eslint-disable react/prop-types */
import { IoAdd } from "react-icons/io5";

export default function DashboardCardAction({icon,action, color}) {
  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <div className={`bg-[#584ce1] text-white rounded-[3px] p-0.5 -ml-1`}>
          {icon}
        </div>
        <span>{action}</span>
        <IoAdd />
      </div>
    </>
  );
}

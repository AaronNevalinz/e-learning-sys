/* eslint-disable react/prop-types */
import { IoAdd } from "react-icons/io5";

export default function DashboardCardAction({icon,action}) {
  return (
    <>
      <div className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2">
        <div className={`bg-[#584ce1] text-white rounded-[3px] p-0.5 -ml-1`}>
          {icon}
        </div>
        <span className="uppercase">{action}</span>
        <IoAdd />
      </div>
    </>
  );
}

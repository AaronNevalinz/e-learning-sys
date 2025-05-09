import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "./ui/sidebar";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";

export default function AdminSidebar() {
  return (
    <>
      <Sidebar className={""}>
        <SidebarContent className={"bg-slate-900 text-white "}>
          <SidebarHeader>
            <h1 className="mt-4">Learning Content</h1>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent
              className={"font-montserrat text-sm mt-6 pl-2 font-medium"}
            >
              <div className="space-y-8">
                <Link to={"/dashboard"} className="flex items-center gap-x-2">
                  <MdSpaceDashboard size={26} />
                  <p className="text-lg">Dashboard</p>
                </Link>
                <Link
                  to={"/dashboard/courses"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <IoSchool size={26} />
                  <p className="text-lg">All Courses</p>
                </Link>
                <Link
                  to={"/dashboard/archieved-courses"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <FaBoxArchive size={26} />
                  <p className="text-lg">Archived courses</p>
                </Link>
                <Link
                  to={"/dashboard/account"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <MdManageAccounts size={26} />
                  <p className="text-lg">Accounts</p>
                </Link>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

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
        <SidebarContent className={"bg-gray-50 "}>
          <SidebarHeader>
            <h1 className="">Learning Content</h1>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent
              className={"font-montserrat text-sm font-medium"}
            >
              <div className="space-y-4">
                <Link
                  to={"/dashboard"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <MdSpaceDashboard />
                  <p>Dashboard</p>
                </Link>
                <Link
                  to={"/admin/courses"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <IoSchool />
                  <p>All Courses</p>
                </Link>
                <Link
                  to={"/archieved-courses"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <FaBoxArchive />
                  <p>Archived courses</p>
                </Link>
                <Link
                  to={"/account"}
                  className="flex items-center gap-x-2 text-sm"
                >
                  <MdManageAccounts />
                  <p>Account Management</p>
                </Link>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

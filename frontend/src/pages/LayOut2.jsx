import AdminDashboardNavbar from "@/components/admin-dashboard-navbar";
import AdminSidebar from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function LayOut2() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "18rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AdminSidebar />

      <main className="w-full">
        <div>
          <AdminDashboardNavbar />
        </div>

        <div className=" mt-5 max-w-5xl mx-auto font-montserrat">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

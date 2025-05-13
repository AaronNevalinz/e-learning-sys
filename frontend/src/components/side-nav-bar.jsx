import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IoLogOutSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

export default function SideNavbar() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const handleLogOut = (e) => {
    e.preventDefault();
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex justify-between h-16 py-1 items-center shadow px-2 ">
      <SidebarTrigger className={"flex cursor-pointer"} />
      <div className="flex gap-x-4">
        <Link to={"/courses"}>
          <Button
            size={"sm"}
            type="sumbit"
            className={
              "flex  justify-between cursor-pointer bg-blue-700 text-blue-100"
            }
          >
            <AiFillHome className="size-5 fill-blue-100" />
          </Button>
        </Link>
        <form action="" onSubmit={handleLogOut}>
          <Button
            size={"sm"}
            type="sumbit"
            className={
              "flex  justify-between cursor-pointer bg-blue-700 text-blue-100"
            }
          >
            <IoLogOutSharp className="size-5 fill-blue-100" />
          </Button>
        </form>
      </div>
    </div>
  );
}

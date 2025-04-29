import { FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function SideNavbar() {
  return (
    <div>
      <nav className="flex justify-between bg-white items-center mx-auto py-3 px-4 shadow">
        <ul className="flex gap-x-10 items-center uppercase text-slate-600 text-sm font-bold">
          <li>
            <SidebarTrigger className={"flex cursor-pointer"} />
          </li>
          <li>
            <Link to={"/"} className="hover:text-slate-900 transition-all">
              Tags
            </Link>
          </li>
          <li>
            <Link
              to={"/courses"}
              className="hover:text-slate-900 transition-all"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to={"/search"}
              className="hover:text-slate-900 transition-all"
            >
              Search
            </Link>
          </li>
        </ul>
        <Link
          className={
            "bg-gradient-to-r font-black font-montserrat from-purple-500 to-red-500 inline-block text-transparent bg-clip-text text-xl"
          }
          to="/"
        >
          <div className="flex items-center gap-x-2">
            <FaBrain size={38} className="fill-yellow-600" />
            <p>99Exceptions</p>
          </div>
        </Link>
        <div className="flex gap-x-2">
          <Link to={"/login"}>
            <Button
              variant={"outline"}
              className={
                "border-[#3E7B27] outline cursor-pointer rounded-none uppercase"
              }
            >
              My learning
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button
              variant={"outline"}
              className={"border-[#3E7B27] outline cursor-pointer rounded-none"}
            >
              SIGN IN
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button className={"bg-[#3E7B27] cursor-pointer rounded-none"}>
              Get Started for Free
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

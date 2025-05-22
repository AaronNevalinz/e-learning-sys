/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IoLogOutSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUserGraduate } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SideNavbar({
  subtopics = [],
  currentSubtopicId,
  onSubTopicClick,
}) {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const handleLogOut = (e) => {
    e.preventDefault();
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const currentIndex = subtopics.findIndex((s) => s.id === currentSubtopicId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSubTopicClick(subtopics[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < subtopics.length - 1) {
      onSubTopicClick(subtopics[currentIndex + 1].id);
    }
  };
  return (
    <div className="flex justify-between h-12 py-1 items-center shadow px-2 ">
      <div className="flex items-center gap-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="">
                <SidebarTrigger className={"flex cursor-pointer"} />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <FaBrain size={26} className="fill-orange-700" />
        <div className="flex gap-x-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <MdNavigateBefore
                    className="bg-slate-200 cursor-pointer fill-slate-700 w-12 rounded-md"
                    size={25}
                    onClick={handlePrev}
                    disabled={currentIndex <= 0}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Previous</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <MdNavigateNext
                    className="bg-slate-200 cursor-pointer fill-slate-700 w-12 rounded-md"
                    size={25}
                    onClick={handleNext}
                    disabled={currentIndex >= subtopics.length - 1}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex gap-x-4">
        <Link to={"/courses"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    size={"sm"}
                    type="sumbit"
                    className={
                      "flex  justify-between cursor-pointer bg-gradient-to-br from-purple-900 to-gray-800 text-blue-100"
                    }
                  >
                    <AiFillHome className="size-5 fill-blue-100" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <Link to={"/profile"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    size={"sm"}
                    type="sumbit"
                    className={
                      "flex  justify-between cursor-pointer bg-gradient-to-br from-purple-900 to-gray-800 text-blue-100"
                    }
                  >
                    <FaUserGraduate className="size-5 fill-blue-100" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Navigate to your profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>

        <form action="" onSubmit={handleLogOut}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    size={"sm"}
                    type="sumbit"
                    className={
                      "flex  justify-between cursor-pointer bg-gradient-to-br from-purple-900 to-gray-800 text-blue-100"
                    }
                  >
                    <IoLogOutSharp className="size-5 fill-blue-100" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>LogOut</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>
    </div>
  );
}

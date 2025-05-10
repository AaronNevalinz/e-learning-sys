import { Link, useNavigate } from "react-router-dom";
import { FaBrain } from "react-icons/fa";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoLogOutSharp, IoSettings, IoLibrarySharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
export default function Navbar() {
  const { token, setToken, userRole } = useContext(AppContext);
  const navigate = useNavigate()

  const handleLogOut = (e)=>{
    e.preventDefault();
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="shadow-xl h-16 fixed z-50 w-full bg-white">
      <nav className="flex justify-between items-center py-4 max-w-7xl mx-auto">
        <Link
          className={
            "bg-gradient-to-r font-bold font-montserrat from-purple-500 via-red-500 to-blue-700 inline-block text-transparent bg-clip-text text-lg"
          }
          to="/"
        >
          <div className="flex items-center gap-x-2">
            <FaBrain size={30} className="fill-purple-900" />
            <p>99Exceptions.edu</p>
          </div>
        </Link>
        <ul className="flex gap-x-10 items-center uppercase text-slate-600 text-sm font-medium">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/courses"}>Knowledge Base</Link>
          </li>
          <li>
            <Link to={"#"}>blog</Link>
          </li>
          <li>
            <Link to={"#"}>About us</Link>
          </li>
          <li>
            <Link to={"#"}>Contact us</Link>
          </li>
          <li>
            {token && userRole === "ADMIN" && <Link to={"/dashboard"}>Dashboard</Link>}
          </li>
        </ul>

        <div className="flex gap-x-2">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    className={"cursor-pointer"}
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"w-56 mr-4"}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to={"/profile"}>
                    <DropdownMenuItem
                      className={"flex justify-between cursor-pointer"}
                    >
                      My Profile
                      <FaUserGraduate className="size-5 fill-black" />
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className={"flex justify-between cursor-pointer"}
                  >
                    My Library
                    <IoLibrarySharp className="size-5 fill-black" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={"flex justify-between cursor-pointer"}
                  >
                    Settings
                    <IoSettings className="size-5 fill-black" />
                  </DropdownMenuItem>
                  <form action="" onSubmit={handleLogOut}>
                    <button type="sumbit">
                      <DropdownMenuItem
                        className={"flex justify-between cursor-pointer"}
                      >
                        Logout
                        <IoLogOutSharp className="size-5 fill-black" />
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to={"/login"}>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className={
                    "border-blue-700 rounded-2xl text-blue-700 hover:text-blue-800 hover:bg-transparent outline cursor-pointer"
                  }
                >
                  SIGN IN
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  size={"sm"}
                  className={
                    "bg-blue-700 px-6 hover:bg-blue-800 cursor-pointer rounded-2xl"
                  }
                >
                  Get Started for Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

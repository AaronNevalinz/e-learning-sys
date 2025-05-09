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
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate()

  const handleLogOut = (e)=>{
    e.preventDefault();
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="shadow h-18 fixed z-50 w-full bg-white">
      <nav className="flex justify-between items-center py-4 max-w-7xl mx-auto">
        <ul className="flex gap-x-10 items-center uppercase text-slate-600 text-sm font-bold">
          <li>
            <Link to={"/"}>Tags</Link>
          </li>
          <li>
            <Link to={"/courses"}>Courses</Link>
          </li>
          <li>
            <Link to={"/search"}>Search</Link>
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
                  <Link to={'/profile'}>
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
                  className={
                    "border-[#3E7B27] outline cursor-pointer rounded-none"
                  }
                >
                  SIGN IN
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button className={"bg-[#3E7B27] cursor-pointer rounded-none"}>
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

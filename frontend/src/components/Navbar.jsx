import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="shadow h-18 fixed w-full bg-white">
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
            "bg-gradient-to-r font-black font-montserrat from-[#123524] to-[#3E7B27] inline-block text-transparent bg-clip-text text-xl"
          }
          to="/"
        >
          <div className="flex items-center gap-x-3">
            {/* <img src={logo} alt="" className="w-8" /> */}
            <span>
              E-learner<span className="italic font-black text-2xl">!</span>
            </span>
          </div>
        </Link>
        <div className="flex gap-x-2">
          <Link to={"/login"}>
            <Button
              variant={"outline"}
              className={"border-[#3E7B27] outline cursor-pointer rounded-none"}
            >
              SIGN IN
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button className={"bg-[#3E7B27] cursor-pointer rounded-none"}>Get Started for Free</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

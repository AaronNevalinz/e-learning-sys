import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function LayOut() {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto pt-24 "><Outlet/></main>
    </div>
  );
}

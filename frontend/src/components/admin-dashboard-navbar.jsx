import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { DialogContent } from "./ui/dialog";
import { TbLogout } from "react-icons/tb";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export default function AdminDashboardNavbar() {
  return (
    <div>
      <nav className="flex justify-between gap-x-30 bg-white items-center mx-auto py-4 px-4 shadow-md">
        <SidebarTrigger className={"cursor-pointer"} />
        <Input className={"py-1"} placeholder="search courses here..." />
        <div className="flex items-center gap-x-3 text-sm">
          <div>
            <Button variant={"outline"}>
              <p>Logout</p>
              <TbLogout />
            </Button>
          </div>
          <Dialog className="">
            <DialogTrigger>
              <Button className={"text-sm rounded-none cursor-pointer"}>
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className={"w-"}>
              <form action="" className="mt-4 space-y-4">
                <div>
                  <Label>Course Title</Label>
                  <Input
                    className={"mt-2"}
                    placeholder="Enter the Course Title"
                  />
                </div>

                <div className="w-full">
                  <Label>Select category</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select a Category</SelectLabel>
                        <SelectItem value="devop">DEVOPS</SelectItem>
                        <SelectItem value="frameworks">FRAMEWORKS</SelectItem>
                        <SelectItem value="language">LANGUAGES</SelectItem>
                        <SelectItem value="techniques">TECHNIQUES</SelectItem>
                        <SelectItem value="testing">TESTING</SelectItem>
                        <SelectItem value="tooling">TOOLING</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Course Image</Label>
                  <Input className={"mt-2"} type={"file"} />
                </div>
                <div>
                  <Label>Course Description</Label>
                  <Textarea
                    className={"mt-2"}
                    placeholder={"Enter Course Description "}
                  />
                </div>
                <Link to={"/dashboard/create-course"}>
                  <Button className={"cursor-pointer rounded-none"}>
                    Add Course
                  </Button>
                </Link>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
}

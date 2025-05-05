import { IoDocumentTextOutline, IoDocumentAttachSharp } from "react-icons/io5";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import DashboardCardAction from "@/components/dashboard-card-action";
import { Separator } from "@/components/ui/separator";
import IssuedContentCard from "@/components/IssuedContentCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdGrade } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { GoLog } from "react-icons/go";

export default function Dashboard() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold">{getGreeting()}, Aaron👋</h1>
        <div className="flex h-6 my-4 items-center space-x-6 text-sm">
          <DashboardCardAction
            color="#ffe600"
            action="course"
            icon={<IoDocumentTextOutline />}
          />
          <Separator orientation="vertical" />
          <DashboardCardAction
            color="#6466e9"
            action="quiz"
            icon={<IoDocumentAttachSharp />}
          />
          <Separator orientation="vertical" />
          <Dialog>
            <DialogTrigger className='cursor-pointer'>
              <DashboardCardAction
                className="cursor-pointer"
                color="#dc4838"
                action="Tags"
                icon={<HiMiniClipboardDocumentList />}
              />
            </DialogTrigger>
            <DialogContent>
              <div className="mt-6 space-y-4">
                <h1 className="uppercase font-medium">Add Tag</h1>
                <form action="" className="flex items-center gap-x-6">
                  <Input
                    type={"text"}
                    className={"rounded-none"}
                    placeholder="Add Tag"
                  />
                  <Button className={"cursor-pointer rounded-none"}>
                    Submit
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 mr- gap-8">
          <IssuedContentCard />
          <IssuedContentCard />
          <div className="border rounded-md px-5 py-2">
            <h1 className="font-medium">Top Learners</h1>
            <div>
              <div className="flex gap-x-8 items-center my-4">
                <p>#1</p>
                <div className="flex items-center gap-x-2 text-sm">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-xs">Omara Daniel Obura</p>
                </div>
                <div>
                  <MdGrade />
                </div>
              </div>
              <Separator />

              <div className="flex gap-x-8 items-center my-4">
                <p>#1</p>
                <div className="flex items-center gap-x-2 text-sm">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-xs">Omara Daniel Obura</p>
                </div>
                <div>
                  <MdGrade />
                </div>
              </div>
              <Separator />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Table className={"border rounded-md"}>
            <TableCaption>A list of your recent Courses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SN</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Total Topics</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>OOP in php</TableCell>
                <TableCell>20</TableCell>
                <TableCell className="">API</TableCell>
                <TableCell className="">30/04/2025</TableCell>
                <TableCell className="">view</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>OOP in php</TableCell>
                <TableCell>20</TableCell>
                <TableCell className="">Published</TableCell>
                <TableCell className="">30/04/2025</TableCell>
                <TableCell className="">view</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoMdEye } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function TopicQuestions() {
  return (
    <div>
      <h1>Questions for topic 1</h1>
      <Table className={"border rounded-full mt-4"}>
        <TableHeader className={"bg-slate-300"}>
          <TableRow className={""}>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Choices</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>OOP in php</TableCell>
            <TableCell>20</TableCell>
            <TableCell className="flex items-center gap-x-3">
              <Dialog>
                <DialogTrigger>
                  <IoMdEye size={20} className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                 <div className="mt-3">
                    <h1 className="uppercase text-sm font-bold">view question</h1>
                    <Input
                        value={'Hello'}
                    /> 
                 </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <FaTrash size={15} className="fill-red-500 cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <div className="text-center text-sm mt-4">
                    <p>Are you sure you wanna delete this</p>
                    <p>Mind you there is no going back</p>
                  </div>
                  <div className="flex justify-center gap-x-4">
                    <DialogClose>
                      <Button size={"sm"} className={"cursor-pointer"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      className={"bg-red-700 cursor-pointer"}
                    >
                      Delete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

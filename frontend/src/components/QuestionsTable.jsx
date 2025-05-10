import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const QuizTable = () => {
  const quizzes = [
    {
      id: 1,
      title: "How to be great and good UI/UX designer",
      questions: "4 open ended",
      learner: {
        name: "Adit Irwan",
        avatar: "https://source.unsplash.com/150x150/?peep", // Placeholder
      },
    },
    {
      id: 2,
      title: "Applications, tools, and plugins to make yo...",
      questions: "10 open ended",
      learner: {
        name: "Arif Brata",
        avatar: "https://source.unsplash.com/150x150/?person", // Placeholder
      },
    },
    {
      id: 3,
      title: "Great designer must know the best for clie...",
      questions: "3 open ended",
      learner: {
        name: "Ardhi Irwandi",
        avatar: "https://source.unsplash.com/150x150/?user", // Placeholder
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold">Ungraded Quiz</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>List of quizzes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz SN</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Choices</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell className="font-medium">{quiz.title}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-gray-100 border-gray-300 text-gray-700"
                >
                  {quiz.questions}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={quiz.learner.avatar}
                      alt={quiz.learner.name}
                    />
                    <AvatarFallback>
                      {quiz.learner.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{quiz.learner.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Grade Now
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuizTable;

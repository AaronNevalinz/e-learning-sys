/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CourseProgressCard = ({progress, title}) => {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-gray-800 p-3 rounded-md shadow-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Badge
          variant="secondary"
          className="bg-purple-500/20 text-purple-300 border-purple-500/30"
        >
          🎓 Course
        </Badge>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">
        {title}
      </h2>
      <div className="mb-2">
        <Progress value={progress} className="h-2 bg-gray-700" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{progress}% completed</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;

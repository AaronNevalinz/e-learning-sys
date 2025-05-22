import { CheckCircle, Users } from "lucide-react";
import hero from "../assets/images/hero.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section>
        <section className="py-16 md:py-24 lg:py-16 md:px-10 px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl leading-18 lg:text-6xl font-bold text-gray-800 mb-4">
              Transform Your Future with{" "}
              <span className="text-blue-600">World-Class Learning</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Unlock new opportunities and accelerate your success. Our platform connects you with top experts, actionable skills, and proven strategies—so you can achieve more, faster.
            </p>
            <div className="flex items-center gap-4">
              <Link to={"/courses"}>
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Start Learning Now
                </Button>
              </Link>
            </div>
            <div className="mt-8 text-gray-600">
              <Users className="inline-block w-5 h-5 mr-2 text-blue-500" />
              Join 4,000+ ambitious learners building their edge today
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="w-full max-w-2xl mx-auto bg-gray-200 rounded-lg h-72 flex items-center justify-center">
              <img src={hero} alt="E-learning platform hero" className="w-full" />
            </div>
          </div>
        </section>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 text-center">
            Your Shortcut to Real Results
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl">
            Stop guessing and start growing. Our expertly crafted courses give you the clarity, confidence, and skills to reach your goals—on your terms, at your pace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">
              Learn Directly from Industry Leaders
            </span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">
              Proven Methods, Measurable Progress
            </span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">
              100% Flexible—Anytime, Anywhere
            </span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">
              Lifetime Access, Unlimited Growth
            </span>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Link to={"/courses"}>
            <Button
              variant="outline"
              className="text-blue-600 cursor-pointer hover:bg-blue-50 hover:text-blue-700 border-blue-600/50 flex items-center gap-2"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;

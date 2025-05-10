import { CheckCircle, PlayCircle, Users } from "lucide-react";
import hero from '../assets/images/hero.png'
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <>
      <section>
        <section className="py-16 md:py-24 lg:py-20 px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl leading-18 lg:text-6xl font-medium text-gray-800 mb-4">
              Unlock Your Potential with <span className="text-blue-600">Expert Guidance</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Transform your career and achieve your goals with our comprehensive e-learning platform. Learn from industry leaders and gain skills that matter.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enroll Now
              </Button>
              <Button
                variant="outline"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-600/50 flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Watch Video
              </Button>
            </div>
            <div className="mt-8 text-gray-600">
              <Users className="inline-block w-5 h-5 mr-2 text-blue-500" />
              Join 4k+ learners who are already ahead of the curve
            </div>
          </div>
          <div className="md:w-1/2">
            {/* Replace with actual image if available, or a placeholder */}
            <div className="w-full max-w-2xl mx-auto bg-gray-200 rounded-lg h-72 flex items-center justify-center">
              <img src={hero} alt="Placeholder" className="w-full" />
            </div>
          </div>
        </section>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 text-center">
            Elevate Your Learning Experience
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl">
            Discover a world of opportunities with our expertly designed courses. Whether you're advancing your career or exploring new skills, we provide the tools and support you need to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Learn from Industry Experts</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Achieve Outstanding Results</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle
             className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Flexible Online Learning</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Unlimited Lifetime Access</span>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <Button
            variant="outline"
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-blue-600/50 flex items-center gap-2"
          >
            Discover More
          </Button>
        </div>
      </section>
    </>
  );
};

export default Hero;

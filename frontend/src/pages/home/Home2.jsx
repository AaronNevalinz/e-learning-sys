import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Users, CheckCircle, BookOpen } from "lucide-react";

const Home2 = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <header className="py-4 px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Book Club</h1>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Courses
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blogs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Login
            </a>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sing Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            An investment in <span className="text-blue-600">knowledge</span>{" "}
            pays the best interest
          </h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet consectetur. Et lacus adipiscing massa ac
            facilisi. Egestas blandit...
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
            4k+ Enrollments
          </div>
        </div>
        <div className="md:w-1/2">
          {/* Replace with actual image if available, or a placeholder */}
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/400x300/EEE/31343C"
              alt="Placeholder"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-10 lg:px-20 bg-gray-50">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 text-center">
            Enhance Your Learning with us
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. Proin mauris volutpat cursus
            dignissim vitae ac aliquam vel. Egestas dictum at lectus sed lacus
            habitant.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Expert Trainer</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Great Result</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Online Learning</span>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-gray-700 font-medium">Lifetime Access</span>
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
    </div>
  );
};

export default Home2;

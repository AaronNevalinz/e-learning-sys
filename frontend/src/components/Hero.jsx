import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative  py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* <div className="mb-6">
          <span className="text-xs uppercase tracking-wide bg-purple-100 text-purple-700 px-4 py-1 rounded-full">
            Trenning Gen 2.0 is here, check it out →
          </span>
        </div> */}

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Advanced learning platform
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Explore the future of Online Learning Management Platform with our
          comprehensive suite of advanced learning solutions enhanced by AI
          Technology.
        </p>

        <div className="flex justify-center gap-4">
          <Link to={'/courses'} className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700">
            Get Started right now
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;

const Footer = () => {
  return (
    <footer className="bg-[#1E2530] text-white px-6 py-10 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Want us to email you occasionally with 99news?
          </h2>
          <div className="flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-[#2C3442] text-white px-4 py-2 rounded-md w-72 outline-none"
            />
            <button className="bg-[#3A8FFF] hover:bg-[#2b7de0] px-5 py-2 rounded-md font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm border-t border-gray-600 pt-8">
          <div>
            <h3 className="text-xl font-bold mb-2">99Exceptions</h3>
            <p>
              Nine out of ten doctors recommend 99Exceptions over competing brands.
              Come inside, see for yourself, and massively level up your
              development skills in the process.
            </p>
            <div className="flex gap-2 mt-4">
              <button className="bg-[#2C3442] p-2 rounded">
                <i className="fab fa-youtube"></i>
              </button>
              <button className="bg-[#2C3442] p-2 rounded">
                <i className="fab fa-x-twitter"></i>
              </button>
              <button className="bg-[#2C3442] p-2 rounded">
                <i className="fab fa-tiktok"></i>
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">LEARN</h4>
            <ul className="space-y-1">
              <li>Series</li>
              <li>CreatorSeries</li>
              <li>Larabits</li>
              <li>Topics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">DISCUSS</h4>
            <ul className="space-y-1">
              <li>Forum</li>
              <li>Podcast</li>
              <li>Blog</li>
              <li>Support</li>
              <li>New Instructors</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">EXTRAS</h4>
            <ul className="space-y-1">
              <li>Gift Certificates</li>
              <li>Apparel</li>
              <li>Lifers</li>
              <li>Teams</li>
              <li>FAQ</li>
              <li>Assets</li>
              <li>Get a Job</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-10">
          © 99Exceptions 2025. All rights reserved. Yes, all of them. That means
          you, Todd.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

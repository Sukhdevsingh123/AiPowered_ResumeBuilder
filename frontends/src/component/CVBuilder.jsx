import React from "react";

const CVBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background CV Images (Overlapping) */}
      <div className="absolute top-10 left-10 opacity-50 transform -rotate-12">
        <div className="w-48 h-64 bg-maroon-500 rounded-lg shadow-lg"></div>
      </div>
      <div className="absolute bottom-10 right-10 opacity-50 transform rotate-12">
        <div className="w-48 h-64 bg-green-500 rounded-lg shadow-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Headline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Change Your CV. Change your life.
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-6">
         Not just a CV builder—Cvault is your intelligent, decentralized career companion.
          Create, own, and share job-winning resumes with privacy and power on your side.
        </p>

        {/* Checkmark Points */}
        <ul className="text-left space-y-4 mb-8">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-gray-700">
            AI-Generated Resumes
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-gray-700">
            Secure Web3 Storage
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-gray-700">Instant Matching with Job Descriptions
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-green-500 mr-2">✔</span>
            <span className="text-gray-700"> Download or Share with a Click
              </span>
          </li>
        </ul>

        {/* Call to Action Button */}
        <button className="bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition duration-300">
          Find your cv by Address now
        </button>
      </div>
    </div>
  );
};

export default CVBuilder;
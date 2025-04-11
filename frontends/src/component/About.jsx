// import React from "react";

// const About = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
//       {/* Decorative Elements */}
//       <div className="absolute top-10 left-10 opacity-50 transform rotate-12">
//         <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//           <polygon points="10,0 20,20 0,20" />
//         </svg>
//       </div>
//       <div className="absolute bottom-10 right-10 opacity-50">
//         <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
//           <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-9h2v6h-2V9zm0-4h2v2h-2V5z" />
//         </svg>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 max-w-5xl w-full">
//         {/* Three Columns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Column 1: Pick a CV Template */}
//           <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
//             <div className="w-32 h-48 bg-orange-300 mx-auto rounded-lg mb-4 flex items-center justify-center">
//               <span className="text-white font-bold">CV</span>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Pick a CV template.</h3>
//             <p className="text-gray-600">
//               Choose a sleek design and layout to get started.
//             </p>
//             <div className="mt-4">
//               <svg
//                 className="w-12 h-12 text-orange-500 mx-auto"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                 <path
//                   fillRule="evenodd"
//                   d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Column 2: Fill in the Blanks */}
//           <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
//             <div className="w-32 h-48 bg-white mx-auto rounded-lg mb-4 flex items-center justify-center border-2 border-blue-500">
//               <div className="text-blue-500 font-bold">Skills</div>
//               <div className="absolute mt-16">
//                 <svg
//                   className="w-6 h-6 text-blue-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Fill in the blanks.</h3>
//             <p className="text-gray-600">
//               Type in a few words. Let the Zety CV wizard fill the rest.
//             </p>
//             <div className="mt-4">
//               <svg
//                 className="w-12 h-12 text-green-500 mx-auto"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                 <path
//                   fillRule="evenodd"
//                   d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Column 3: Customize Your Document */}
//           <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
//             <div className="w-32 h-48 bg-yellow-200 mx-auto rounded-lg mb-4 flex items-center justify-center relative">
//               <span className="text-green-600 font-bold">CV</span>
//               <div className="absolute bottom-2 right-2">
//                 <svg
//                   className="w-6 h-6 text-red-500"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M13.586 3.586a2 2 0 112828 2.828L6.414 16.414A2 2 0 013.586 13.586L13.586 3.586z" />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Customize your document.</h3>
//             <p className="text-gray-600">
//               Make it truly yours. Uniqueness in a few clicks.
//             </p>
//             <div className="mt-4">
//               <svg
//                 className="w-12 h-12 text-red-500 mx-auto"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M13.586 3.586a2 2 0 112828 2.828L6.414 16.414A2 2 0 013.586 13.586L13.586 3.586z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Footer Tagline */}
//         <div className="mt-10 text-center">
//           <p className="text-xl font-semibold text-gray-700">
//             Change Your CV. Change your life.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;




import React from "react";
import skills from '../assets/1.jpg';
import resume from '../assets/2.webp';
import cv from "../assets/3.webp";
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-50 transform rotate-12">
        <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <polygon points="10,0 20,20 0,20" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-50">
        <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-9h2v6h-2V9zm0-4h2v2h-2V5z" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Pick a CV Template */}
          <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-32 h-48 mx-auto rounded-lg mb-4 overflow-hidden">
              <img
                src={skills}
                alt="CV Template 1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">🔐 Decentralized Storage & 📊 Data Ownership</h3>
            <p className="text-gray-600">
            Your resume, your rules.
            Stored securely on Filecoin via Akave—access it anytime, anywhere, without third-party risks.
            </p>
            <div className="mt-4">
              <svg
                className="w-12 h-12 text-orange-500 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Column 2: Fill in the Blanks */}
          <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-32 h-48 mx-auto rounded-lg mb-4 overflow-hidden">
              <img
                src={resume}
                alt="CV Template 2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 AI That Knows You</h3>
            <p className="text-gray-600">
            Generate a resume tailored to your background and career goals in seconds.
             Let AI craft the perfect CV that makes you stand out.


            </p>
            <div className="mt-4">
              <svg
                className="w-12 h-12 text-green-500 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Column 3: Customize Your Document */}
          <div className="text-center bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-32 h-48 mx-auto rounded-lg mb-4 overflow-hidden">
              <img
                src={cv}
                alt="CV Template 3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📥 Download & Share Instantly</h3>
            <p className="text-gray-600">
            Click to download or share a decentralized link.
            Whether you want a PDF or a secure link, you're one tap away.

  
            </p>
            <div className="mt-4">
              <svg
                className="w-12 h-12 text-red-500 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112828 2.828L6.414 16.414A2 2 0 013.586 13.586L13.586 3.586z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="mt-10 text-center">
          <p className="text-xl font-semibold text-gray-700">
            Change Your CV. Change your life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
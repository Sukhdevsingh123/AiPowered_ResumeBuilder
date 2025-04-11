// import { useNavigate } from "react-router-dom";
// import { FileText } from "lucide-react";
// import { motion } from "framer-motion";


// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-indigo-50 to-white px-8"
//     >
//       <div className="flex flex-nowrap items-center max-w-6xl w-full gap-16">
//         {/* Left Section: Text and Button */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="w-1/2 text-left"
//         >
//           <h1 className="text-5xl font-bold text-gray-800 mb-6">
//             AI Resume Builder (secure storage on Filecoin)
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Build a professional ai generated resume that's secure storage on
//             Filecoin with the help of AKAVE verified on the blockchain. Stand
//             out from the crowd with a tamper-proof digital identity.
//           </p>
//           <motion.button
//             onClick={() => navigate("/create")}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 bg-yellow-500 border-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors"
//           >
//             <FileText size={24} />
//             Create you Cv
//           </motion.button>
//         </motion.div>

//         {/* Right Section: Image */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="w-1/2 flex justify-end"
//         >
//           <img
//             src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000"
//             alt="Professional workspace"
//             className="rounded-lg shadow-xl max-w-full"
//           />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
  
// };


// export default Home;


import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import About from "./About";
import CVBuilder from "./CVBuilder";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-100 to-white px-8"
    >
      <div className="flex flex-nowrap items-center max-w-5xl w-full gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1/2 text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          AI-Powered Web3 Resume Builder 
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Build a professional AI-generated resume with secure storage on
            Filecoin, verified by AKAVE on the blockchain. Stand out with a
            tamper-proof digital identity.
          </p>
          <motion.button
            onClick={() => navigate("/create")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
          >
            <FileText size={20} />
            Create Your CV
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1/2 flex justify-end"
        >
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000"
            alt="Professional workspace"
            className="rounded-lg shadow-xl max-w-full h-auto object-cover"
          />
        </motion.div>
      </div>
      
    </motion.div>
        <CVBuilder />
        <About />
    </>
  );
};

export default Home;
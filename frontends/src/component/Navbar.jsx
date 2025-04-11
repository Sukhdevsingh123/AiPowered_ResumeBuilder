

// import { Link } from "react-router-dom";
// import { Wallet } from "lucide-react";
// import WalletConnect from "../components/WalletConnect";
// import { useEffect } from "react";

// const Navbar = ({
//   walletAddress,
//   setWalletAddress,
//   setProvider,
//   setContract,
// }) => {
//   useEffect(() => {
//     console.log("Wallet Address:", walletAddress);
//   }, [walletAddress]);

//   return (
//     <nav className="bg-indigo-600 text-white py-4 px-6">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           CVault
//         </Link>
      
//         <div className="flex items-center gap-4">
//         <Link to="/find-by-address" className="font-bold hover:text-indigo-300">
//           Find Resume
//         </Link>
//           <WalletConnect
//             setWalletAddress={setWalletAddress}
//             setProvider={setProvider}
//             setContract={setContract}
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import WalletConnect from "../components/WalletConnect";
import { useEffect, useState } from "react";

const Navbar = ({
  walletAddress,
  setWalletAddress,
  setProvider,
  setContract,
}) => {
  // State for mobile menu (optional, uncomment and implement if needed)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Wallet Address:", walletAddress);
  }, [walletAddress]);

  return (
    <nav className="bg-gradient-to-br from-gray-100 to-white text-gray-800 shadow-md sticky top-0 z-50 py-4 px-6 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          CVault
        </Link>

        {/* Navigation Links and Wallet Connect */}
        <div className="flex items-center gap-6">
          <Link
            to="/create"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 px-4 py-2 rounded-md hover:bg-indigo-100 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            Create CV
          </Link>
          <Link
            to="/find-by-address"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 px-4 py-2 rounded-md hover:bg-indigo-100"
          >
            Find Resume
          </Link>
          <WalletConnect
            setWalletAddress={setWalletAddress}
            setProvider={setProvider}
            setContract={setContract}
          />
        </div>

        {/* Optional Mobile Menu Toggle (Uncomment and implement)  */}
         <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
            <Link
              to="/create-cv"
              className="block px-6 py-2 text-indigo-600 hover:bg-indigo-100"
              onClick={() => setIsOpen(false)}
            >
              Create CV
            </Link>
            <Link
              to="/find-by-address"
              className="block px-6 py-2 text-indigo-600 hover:bg-indigo-100"
              onClick={() => setIsOpen(false)}
            >
              Find Resume
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
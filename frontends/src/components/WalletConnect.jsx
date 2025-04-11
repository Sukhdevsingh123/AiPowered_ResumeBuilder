
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import ResumeStorageABI from "../contracts/ResumeStorageABI.json";

// const CONTRACT_ADDRESS = "0x38bedb56679d15d937f4974448d57DDd24Ad81e2";

// const WalletConnect = ({ setWalletAddress, setProvider, setContract }) => {
//   const [address, setAddress] = useState("");
//   const [connectionError, setConnectionError] = useState("");

//   useEffect(() => {
//     checkWalletConnection();
//     if (window.ethereum) {
//       window.ethereum.on('accountsChanged', handleAccountsChanged);
//       window.ethereum.on('chainChanged', () => window.location.reload());
//     }
//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
//       }
//     };
//   }, []);

//   const checkWalletConnection = async () => {
//     try {
//       if (!window.ethereum) {
//         setConnectionError("Please install a wallet extension (MetaMask or Talisman)!");
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.listAccounts();
      
//       if (accounts.length > 0) {
//         await connectToWallet(provider, accounts[0].address); // Use .address for Talisman compatibility
//       }
//     } catch (error) {
//       console.error("Error checking wallet connection:", error);
//       setConnectionError("Failed to check wallet connection");
//     }
//   };

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         setConnectionError("Please install a wallet extension (MetaMask or Talisman)!");
//         return;
//       }

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await window.ethereum.request({ 
//         method: "eth_requestAccounts" 
//       });

//       if (accounts.length > 0) {
//         await connectToWallet(provider, accounts[0]); // First account as string
//       }
//     } catch (error) {
//       console.error("Wallet connection error:", error);
//       setConnectionError(error.message || "Failed to connect wallet");
//     }
//   };

//   const connectToWallet = async (provider, accountAddress) => {
//     try {
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         ResumeStorageABI,
//         signer
//       );
      
//       // Ensure accountAddress is a string
//       const addressString = typeof accountAddress === 'string' 
//         ? accountAddress 
//         : await signer.getAddress();

//       setAddress(addressString);
//       setWalletAddress(addressString);
//       setProvider(provider);
//       setContract(contract);
//       setConnectionError("");
      
//       console.log("Wallet connected:", addressString);
//     } catch (error) {
//       console.error("Error setting up connection:", error);
//       setConnectionError("Failed to setup wallet connection");
//     }
//   };

//   const handleAccountsChanged = (accounts) => {
//     if (accounts.length === 0) {
//       setAddress("");
//       setWalletAddress("");
//       setProvider(null);
//       setContract(null);
//       setConnectionError("Wallet disconnected");
//     } else {
//       checkWalletConnection();
//     }
//   };

//   return (
//     <div>
//       <button 
//         onClick={connectWallet} 
//         style={{ 
//           marginBottom: "10px",
//           padding: "8px 16px",
//           backgroundColor: address ? "#4CAF50" : "#2196F3",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer"
//         }}
//       >
//         {address 
//           ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
//           : "Connect Wallet"}
//       </button>
//       {connectionError && (
//         <p style={{ color: "red", marginTop: "5px" }}>
//           {connectionError}
//         </p>
//       )}
//     </div>
//   );
// };

// export default WalletConnect;

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ResumeStorageABI from '../contracts/ResumeStorageABI.json';

const CONTRACT_ADDRESS = '0x38bedb56679d15d937f4974448d57DDd24Ad81e2';

const WalletConnect = ({ setWalletAddress, setProvider, setContract }) => {
  const [address, setAddress] = useState('');
  const [connectionError, setConnectionError] = useState('');

  useEffect(() => {
    checkWalletConnection();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setConnectionError('Please install a wallet extension (MetaMask or Talisman)!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length > 0) {
        await connectToWallet(provider, accounts[0].address);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      setConnectionError('Failed to check wallet connection');
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setConnectionError('Please install a wallet extension (MetaMask or Talisman)!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        await connectToWallet(provider, accounts[0]);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setConnectionError(error.message || 'Failed to connect wallet');
    }
  };

  const connectToWallet = async (provider, accountAddress) => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ResumeStorageABI, signer);

      const addressString =
        typeof accountAddress === 'string' ? accountAddress : await signer.getAddress();

      setAddress(addressString);
      setWalletAddress(addressString);
      setProvider(provider);
      setContract(contract);
      setConnectionError('');

      console.log('Wallet connected:', addressString);
    } catch (error) {
      console.error('Error setting up connection:', error);
      setConnectionError('Failed to setup wallet connection');
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAddress('');
      setWalletAddress('');
      setProvider(null);
      setContract(null);
      setConnectionError('Wallet disconnected');
    } else {
      checkWalletConnection();
    }
  };

  return (
    <div>
      <button
        onClick={connectWallet}
        style={{
          marginBottom: '10px',
          padding: '8px 16px',
          backgroundColor: address ? '#4CAF50' : '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {address
          ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
          : 'Connect Wallet'}
      </button>
      {connectionError && (
        <p style={{ color: 'red', marginTop: '5px' }}>{connectionError}</p>
      )}
    </div>
  );
};

export default WalletConnect;
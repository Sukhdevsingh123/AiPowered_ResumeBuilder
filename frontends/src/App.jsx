import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ResumeForm from "./component/ResumeForm";
import ResumePreview from "./component/ResumePreview";
import FindResumeByAddress from "./component/FindResumeByAddress"; // Import the new component
import Footer from "./component/Footer";
import Home from "./component/Home";
// import CVBuilder from "./component/CVBuilder";
// import About from "./component/About";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [resume, setResume] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          setProvider={setProvider}
          setContract={setContract}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/create"
              element={
                <ResumeForm
                  walletAddress={walletAddress}
                  provider={provider}
                  contract={contract}
                  setResume={setResume}
                  setFileName={setFileName}
                />
              }
            />
            <Route
              path="/preview"
              element={
                <ResumePreview
                  walletAddress={walletAddress}
                  contract={contract}
                  resume={resume}
                  fileName={fileName}
                />
              }
            />
            <Route
              path="/find-by-address"
              element={
                <FindResumeByAddress
                  walletAddress={walletAddress}
                  contract={contract}
                />
              }
            />
            
          </Routes>
        </main>
        {/* <CVBuilder/> */}
        {/* <About /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

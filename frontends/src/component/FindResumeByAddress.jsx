
import React, { useState, useRef } from "react";
import { FileDown, Search } from "lucide-react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { FileText } from "lucide-react"; // For Create CV button
import { useNavigate } from "react-router-dom"; // For navigation

const FindResumeByAddress = ({ walletAddress, contract }) => {
  const [userAddress, setUserAddress] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!walletAddress || !contract) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!userAddress || !/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    setLoading(true);
    setError("");
    setResumeData(null);

    try {
      const [cid, timestamp, downloaded] = await contract.getResume(userAddress);

      if (!cid) {
        throw new Error("No resume found for this address");
      }

      const response = await axios.get(
        `http://localhost:8000/buckets/Resumes/files/${cid}/download`,
        { responseType: "blob" }
      );

      const text = await response.data.text();

      setResumeData({
        cid,
        timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
        downloaded,
        content: text,
      });
    } catch (err) {
      console.error("Error fetching resume:", err);
      setError(
        err.message === "No resume found for this address"
          ? "No resume found for this address"
          : "Failed to fetch resume. Check the address or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async () => {
    if (!resumeData) {
      alert("No resume available to download!");
      return;
    }
    setDownloadLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://localhost:8000/buckets/Resumes/files/${resumeData.cid}/download`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.cid}.pdf` || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`File downloaded: ${resumeData.cid}`);
    } catch (error) {
      console.error("Download error:", error);
    }
    finally{
    setDownloadLoading(false);
    }
  };

  // const downloadPDF = () => {
  //   const element = resumeRef.current;
  //   const opt = {
  //     margin: 0.5,
  //     filename: `${resumeData?.cid || "resume"}.pdf`,
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };

  //   html2pdf().set(opt).from(element).save();
  // };

  const parseResume = (text) => {
    const lines = text.split("\n").filter((line) => line.trim());
    return {
      name: lines[0]?.replace(/\*\*/g, "") || "Unknown",
      contact: {
        email: lines.find((line) => line.includes("Email:"))?.split(": ")[1] || "",
        linkedin: lines.find((line) => line.includes("LinkedIn:"))?.split(": ")[1] || "",
      },
      education: [
        {
          degree: lines[lines.indexOf("**Education:**") + 1] || "",
          university: lines[lines.indexOf("**Education:**") + 2] || "",
        },
      ],
      experience: [
        {
          role: lines[lines.indexOf("**Professional Experience:**") + 1]?.split(" | ")[0] || "",
          company: lines[lines.indexOf("**Professional Experience:**") + 1]?.split(" | ")[1] || "",
        },
      ],
      skills: lines
        .slice(lines.indexOf("**Skills:**") + 1, lines.indexOf("**Achievements & Awards:**"))
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace("- ", ""))
        .slice(0, 3), // Limit to 3 skills
    };
  };

  const parsedResume = resumeData ? parseResume(resumeData.content) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="mb-6 flex items-center gap-4">
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Enter User wallet Address (e.g., 0x...)"
            className="w-full px-6 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition-all duration-300 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } shadow-md hover:shadow-lg transition-colors`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <Search size={20} />
                Search
              </>
            )}
          </button>
        </div>

        {/* Error Message and Create CV Button */}
        {error && (
          <div className="text-center text-gray-600 mb-6">
            <p className="mb-4">{error}</p>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FileText size={20} />
              Create Your CV
            </button>
          </div>
        )}

        {/* Download Buttons */}
        {resumeData && (
          <div className="flex justify-end mb-4 gap-4 flex-wrap">
           <button
              onClick={downloadResume}
              disabled={downloadLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                downloadLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              } shadow-md hover:shadow-lg transition-colors`}
            >
              {downloadLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <FileDown size={20} />
                  Download from Akave
                </>
              )}
            </button>
            {/* <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <FileDown size={20} />
              Download as PDF
            </button> */}
          </div>
        )}

        {/* Resume Display */}
        {loading ? (
          <div className="text-center text-gray-600">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Fetching resume...</p>
          </div>
        ) : resumeData && parsedResume ? (
          <div
            ref={resumeRef}
            className="bg-white p-6 rounded-xl shadow-2xl"
            style={{ fontFamily: "'Arial', sans-serif", color: "#1a202c", maxWidth: "800px", margin: "auto" }}
          >
            {/* Header */}
            <div className="text-center border-b border-gray-300 pb-4 mb-4">
              <h1 className="text-2xl font-bold text-indigo-600">{parsedResume.name}</h1>
              <h2 className="text-md font-semibold text-gray-700 mt-1">Blockchain Developer</h2>
            </div>

            {/* Metadata */}
            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">Metadata</h3>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">CID:</span> {resumeData.cid}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Uploaded:</span> {resumeData.timestamp}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Downloaded:</span> {resumeData.downloaded ? "Yes" : "No"}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">Contact</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a href={`mailto:${parsedResume.contact.email}`} className="text-indigo-600 hover:underline">
                    {parsedResume.contact.email || "N/A"}
                  </a>
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{" "}
                  <a href={parsedResume.contact.linkedin || "#"} className="text-indigo-600 hover:underline">
                    {parsedResume.contact.linkedin || "N/A"}
                  </a>
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">Education</h3>
              <div className="bg-gray-50 p-2 rounded-lg text-sm">
                {parsedResume.education.map((edu, index) => (
                  <div key={index} className="mb-1">
                    <p className="font-medium text-gray-800">{edu.degree}</p>
                    <p className="text-gray-600">{edu.university}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">Experience</h3>
              <div className="bg-gray-50 p-2 rounded-lg text-sm">
                {parsedResume.experience.map((exp, index) => (
                  <div key={index} className="mb-1">
                    <p className="font-medium text-gray-800">
                      {exp.role} | {exp.company}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-1">Skills</h3>
              <div className="bg-gray-50 p-2 rounded-lg text-sm">
                <ul className="list-disc list-inside text-gray-700">
                  {parsedResume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          !error && (
            <p className="text-center text-gray-600 text-sm">
              Enter a user wallet address to find their resume.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default FindResumeByAddress;




// import React, { useState, useRef } from "react";
// import { FileDown, Search } from "lucide-react";
// import axios from "axios";
// import html2pdf from "html2pdf.js";
// import { FileText } from "lucide-react"; // For Create CV button
// import { useNavigate } from "react-router-dom"; // For navigation

// const FindResumeByAddress = ({ walletAddress, contract }) => {
//   const [userAddress, setUserAddress] = useState("");
//   const [resumeDataList, setResumeDataList] = useState([]); // Changed to array for multiple resumes
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [downloadLoading, setDownloadLoading] = useState(null); // Index of resume being downloaded
//   const resumeRef = useRef(null);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     if (!walletAddress || !contract) {
//       alert("Please connect your wallet first!");
//       return;
//     }

//     if (!userAddress || !/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
//       setError("Please enter a valid Ethereum address");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResumeDataList([]);

//     try {
//       // Assuming contract.getAllResumes returns an array of [cid, timestamp, downloaded] tuples
//       const resumeRecords = await contract.getAllResumes(userAddress);

//       if (!resumeRecords || resumeRecords.length === 0) {
//         throw new Error("No resumes found for this address");
//       }

//       // Fetch and parse each resume
//       const fetchPromises = resumeRecords.map(async ([cid, timestamp, downloaded]) => {
//         const response = await axios.get(
//           `http://localhost:8000/buckets/Resumes/files/${cid}/download`,
//           { responseType: "blob" }
//         );
//         const text = await response.data.text();
//         return {
//           cid,
//           timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
//           downloaded,
//           content: text,
//         };
//       });

//       const resumeDataArray = await Promise.all(fetchPromises);
//       setResumeDataList(resumeDataArray);
//     } catch (err) {
//       console.error("Error fetching resumes:", err);
//       setError(
//         err.message === "No resumes found for this address"
//           ? "No resumes found for this address"
//           : "Failed to fetch resumes. Check the address or try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadResume = async (index) => {
//     const resume = resumeDataList[index];
//     if (!resume) {
//       alert("No resume available to download!");
//       return;
//     }

//     setDownloadLoading(index); // Set loading for specific resume index

//     try {
//       const response = await axios.get(
//         `http://localhost:8000/buckets/Resumes/files/${resume.cid}/download`,
//         { responseType: "blob" }
//       );
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${resume.cid}.pdf` || "resume.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       console.log(`File downloaded: ${resume.cid}`);
//     } catch (error) {
//       console.error("Download error:", error);
//       alert("Failed to download the resume. Please try again.");
//     } finally {
//       setDownloadLoading(null); // Reset loading state
//     }
//   };

//   const downloadPDF = (index) => {
//     const element = resumeRef.current;
//     const resume = resumeDataList[index];
//     const opt = {
//       margin: 0.5,
//       filename: `${resume?.cid || "resume"}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   const parseResume = (text) => {
//     const lines = text.split("\n").filter((line) => line.trim());
//     return {
//       name: lines[0]?.replace(/\*\*/g, "") || "Unknown",
//       contact: {
//         email: lines.find((line) => line.includes("Email:"))?.split(": ")[1] || "",
//         linkedin: lines.find((line) => line.includes("LinkedIn:"))?.split(": ")[1] || "",
//       },
//       education: [
//         {
//           degree: lines[lines.indexOf("**Education:**") + 1] || "",
//           university: lines[lines.indexOf("**Education:**") + 2] || "",
//         },
//       ],
//       experience: [
//         {
//           role: lines[lines.indexOf("**Professional Experience:**") + 1]?.split(" | ")[0] || "",
//           company: lines[lines.indexOf("**Professional Experience:**") + 1]?.split(" | ")[1] || "",
//         },
//       ],
//       skills: lines
//         .slice(lines.indexOf("**Skills:**") + 1, lines.indexOf("**Achievements & Awards:**"))
//         .filter((line) => line.startsWith("- "))
//         .map((line) => line.replace("- ", ""))
//         .slice(0, 3), // Limit to 3 skills
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Search Input */}
//         <div className="mb-6 flex items-center gap-4">
//           <input
//             type="text"
//             value={userAddress}
//             onChange={(e) => setUserAddress(e.target.value)}
//             placeholder="Enter User Address (e.g., 0x...)"
//             className="w-full px-6 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-sm transition-all duration-300 placeholder-gray-500"
//           />
//           <button
//             onClick={handleSearch}
//             disabled={loading}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             } shadow-md hover:shadow-lg transition-colors`}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             ) : (
//               <>
//                 <Search size={20} />
//                 Search
//               </>
//             )}
//           </button>
//         </div>

//         {/* Error Message and Create CV Button */}
//         {error && (
//           <div className="text-center text-gray-600 mb-6">
//             <p className="mb-4">{error}</p>
//             <button
//               onClick={() => navigate("/create")}
//               className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
//             >
//               <FileText size={20} />
//               Create Your CV
//             </button>
//           </div>
//         )}

//         {/* Resume Display */}
//         {loading ? (
//           <div className="text-center text-gray-600">
//             <svg
//               className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             <p>Fetching resumes...</p>
//           </div>
//         ) : resumeDataList.length > 0 ? (
//           resumeDataList.map((resume, index) => {
//             const parsedResume = parseResume(resume.content);
//             return (
//               <div
//                 key={index}
//                 ref={resumeRef}
//                 className="bg-white p-6 rounded-xl shadow-2xl mb-6"
//                 style={{ fontFamily: "'Arial', sans-serif", color: "#1a202c", maxWidth: "800px", margin: "auto" }}
//               >
//                 {/* Header */}
//                 <div className="text-center border-b border-gray-300 pb-4 mb-4">
//                   <h1 className="text-2xl font-bold text-indigo-600">{parsedResume.name}</h1>
//                   <h2 className="text-md font-semibold text-gray-700 mt-1">Blockchain Developer</h2>
//                 </div>

//                 {/* Metadata */}
//                 <div className="mb-4 bg-gray-50 p-3 rounded-lg">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-1">Metadata</h3>
//                   <p className="text-gray-700 text-sm">
//                     <span className="font-medium">CID:</span> {resume.cid}
//                   </p>
//                   <p className="text-gray-700 text-sm">
//                     <span className="font-medium">Uploaded:</span> {resume.timestamp}
//                   </p>
//                   <p className="text-gray-700 text-sm">
//                     <span className="font-medium">Downloaded:</span> {resume.downloaded ? "Yes" : "No"}
//                   </p>
//                 </div>

//                 {/* Contact */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-1">Contact</h3>
//                   <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
//                     <p>
//                       <span className="font-medium">Email:</span>{" "}
//                       <a href={`mailto:${parsedResume.contact.email}`} className="text-indigo-600 hover:underline">
//                         {parsedResume.contact.email || "N/A"}
//                       </a>
//                     </p>
//                     <p>
//                       <span className="font-medium">LinkedIn:</span>{" "}
//                       <a href={parsedResume.contact.linkedin || "#"} className="text-indigo-600 hover:underline">
//                         {parsedResume.contact.linkedin || "N/A"}
//                       </a>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Education */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-1">Education</h3>
//                   <div className="bg-gray-50 p-2 rounded-lg text-sm">
//                     {parsedResume.education.map((edu, i) => (
//                       <div key={i} className="mb-1">
//                         <p className="font-medium text-gray-800">{edu.degree}</p>
//                         <p className="text-gray-600">{edu.university}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Experience */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-1">Experience</h3>
//                   <div className="bg-gray-50 p-2 rounded-lg text-sm">
//                     {parsedResume.experience.map((exp, i) => (
//                       <div key={i} className="mb-1">
//                         <p className="font-medium text-gray-800">
//                           {exp.role} | {exp.company}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Skills */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold text-indigo-600 mb-1">Skills</h3>
//                   <div className="bg-gray-50 p-2 rounded-lg text-sm">
//                     <ul className="list-disc list-inside text-gray-700">
//                       {parsedResume.skills.map((skill, i) => (
//                         <li key={i}>{skill}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Download Buttons for each resume */}
//                 <div className="flex justify-end gap-4 flex-wrap">
//                   <button
//                     onClick={() => downloadResume(index)}
//                     disabled={downloadLoading === index}
//                     className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
//                       downloadLoading === index
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-600 text-white hover:bg-green-700"
//                     } shadow-md hover:shadow-lg transition-colors`}
//                   >
//                     {downloadLoading === index ? (
//                       <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                     ) : (
//                       <>
//                         <FileDown size={20} />
//                         Download from Akave
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={() => downloadPDF(index)}
//                     className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
//                   >
//                     <FileDown size={20} />
//                     Download as PDF
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           !error && (
//             <p className="text-center text-gray-600 text-sm">
//               Enter a user address to find their resumes.
//             </p>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindResumeByAddress;

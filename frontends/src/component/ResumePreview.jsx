

import React, { useRef ,useState} from "react";
import { FileDown } from "lucide-react";
import html2pdf from "html2pdf.js";
import axios from "axios";

const ResumePreview = ({ walletAddress, contract, resume, fileName }) => {

  const resumeRef = useRef(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const downloadResume = async () => {
    if (!walletAddress || !contract) {
      alert("Please connect your wallet first!");
      return;
    }
    setDownloadLoading(true); // Start loading
    if (!fileName) {
      alert("No resume file available to download!");
      return;
    }

    try {
      if (contract.downloadResume) {
        const tx = await contract.downloadResume();
        await tx.wait();
      }

      const response = await axios.get(
        `http://localhost:8000/buckets/Resumes/files/${fileName}/download`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`File downloaded: ${fileName}`);
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
  //     margin: [20, 20, 20, 20],
  //     filename: "resume.pdf",
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2, useCORS: true },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //   };

  //   html2pdf().set(opt).from(element).save();
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {resume && (
          <div className="flex justify-center mb-8 gap-4">
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
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FileDown size={20} />
              Download as PDF
            </button> */}
          </div>
        )}

        {resume ? (
          <div
            ref={resumeRef}
            className="bg-white p-8 rounded-xl shadow-2xl"
            style={{ fontFamily: "'Arial', sans-serif", color: "#1a202c", maxWidth: "800px", margin: "auto" }}
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-indigo-600">{resume.name}</h1>
              <h2 className="text-lg font-semibold text-gray-700 mt-1">Blockchain Developer</h2>
            </div>

            <div className="flex mt-8">
              {/* Left Column */}
              <div className="w-1/3 pr-6 border-r border-gray-200">
                {/* Contact */}
                <h3 className="text-sm font-bold text-indigo-600 uppercase">Contact</h3>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <span className="mr-1">📞</span>
                    <a href={`tel:${resume.contact.phone}`}>{resume.contact.phone}</a>
                  </p>
                  <p>
                    <span className="mr-1">📧</span>
                    <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
                  </p>
                  <p>
                    <span className="mr-1">🔗</span>
                    <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    <span className="mr-1">💻</span>
                    <a href={resume.contact.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </p>
                  <p>
                    <span className="mr-1">🌐</span>
                    <a href={resume.contact.portfolio} target="_blank" rel="noopener noreferrer">
                      Portfolio
                    </a>
                  </p>
                </div>

                {/* Skills */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Skills</h3>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  {resume.skills.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>

                {/* Languages */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Languages</h3>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{resume.languages}</span>
                  </li>
                </ul>
              </div>

              {/* Right Column */}
              <div className="w-2/3 pl-6">
                {/* Profile */}
                <h3 className="text-sm font-bold text-indigo-600 uppercase">Profile</h3>
                <p className="text-sm text-gray-600 mt-2">{resume.profile || "No profile summary provided."}</p>

                {/* Experience */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Experience</h3>
                {resume.experience.map((exp, index) => (
                  <div key={index} className="mt-3">
                    <p className="text-sm font-semibold text-gray-800">{exp.title}</p>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Education */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Education</h3>
                <p className="text-sm text-gray-600 mt-2">{resume.education}</p>

                {/* Projects */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Projects</h3>
                {resume.projects.map((project, index) => (
                  <div key={index} className="mt-3">
                    <p className="text-sm font-semibold text-gray-800">
                      {project.name} ({project.techStack})
                    </p>
                    <p className="text-sm text-gray-600">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="underline">
                        View Project
                      </a>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{project.summary}</p>
                  </div>
                ))}

                {/* Certifications */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Certifications</h3>
                <p className="text-sm text-gray-600 mt-2">{resume.certifications}</p>

                {/* Achievements & Awards */}
                <h3 className="text-sm font-bold text-indigo-600 mt-6 uppercase">Achievements & Awards</h3>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{resume.achievements}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{resume.awards}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Waiting for resume to be generated...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;



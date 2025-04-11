

// backend/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import puppeteer from "puppeteer";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-resume", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      linkedin,
      github,
      portfolio,
      education,
      educationDuration,
      university,
      graduationYear,
      experience,
      experienceDuration,
      companyName,
      role,
      jobDescription,
      skills,
      certifications,
      certificationDate,
      achievements,
      awards,
      languages,
      projects,
    } = req.body;

    const formattedProjects = Array.isArray(projects) && projects.every(p => typeof p === "object") ? projects : [];

    const projectSummaries = await Promise.all(
      formattedProjects.map(async (project) => {
        if (project.description) {
          const summary = await generateProjectSummary(project.description, project.techStack);
          return {
            name: project.name,
            techStack: project.techStack,
            liveLink: project.liveLink,
            summary,
          };
        } else {
          return {
            name: project.name,
            techStack: project.techStack,
            liveLink: project.liveLink,
            summary: `Built a project using ${project.techStack}. No detailed description provided.`,
          };
        }
      })
    );

    // Default skills to add
    const defaultSkills = ["JavaScript", "Git", "Blockchain"];
    const userSkills = skills ? skills.split(",").map(s => s.trim()) : [];
    const allSkills = [...new Set([...userSkills, ...defaultSkills])]; // Combine and deduplicate

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer. Generate a professional resume with detailed sections. Include a Profile section (50-100 words) summarizing experience, skills, and achievements. For Experience, provide a detailed description (3-5 bullet points). Use only the skills provided and do not add extra skills beyond those listed.",
        },
        {
          role: "user",
          content: `
          Write a tailored resume for a ${role} role at ${companyName} according to the ${jobDescription}.

          **Personal Details:**
          - Name: ${name}
          - Phone: ${phone}
          - Email: ${email}
          - LinkedIn: ${linkedin}
          - GitHub: ${github}
          - Portfolio: ${portfolio}

          **Education:**
          - ${education}, ${university} (${educationDuration} years, Graduated: ${graduationYear})

          **Experience:**
          - ${experience} (${experienceDuration} years) at ${companyName}

          **Skills:**
          - ${allSkills.join(", ")}

          **Certifications:**
          - ${certifications} (${certificationDate})

          **Projects:**
          ${projectSummaries.length > 0 ? projectSummaries.map(p => `- ${p.name} (${p.techStack}) | [Live](${p.liveLink})\n  Summary: ${p.summary}`).join("\n") : "No projects listed."}

          **Achievements & Awards:**
          - ${achievements || "Not provided"}
          - ${awards || "Not provided"}

          **Languages:**
          - ${languages || "Not provided"}
          `,
        },
      ],
    });

    const generatedResumeText = response.choices[0].message.content;

    // Parse the generated resume into a structured JSON object
    const resumeData = parseResumeText(generatedResumeText, {
      name,
      phone,
      email,
      linkedin,
      github,
      portfolio,
      skills: allSkills.join(", "),
      projectSummaries,
      education: `${education}, ${university} (${educationDuration} years, Graduated: ${graduationYear})`,
      experience: `${experience} (${experienceDuration} years) at ${companyName}`,
      certifications: `${certifications} (${certificationDate})`,
      achievements: achievements || "Not provided",
      awards: awards || "Not provided",
      languages: languages || "Not provided",
    });

    // Generate PDF using Puppeteer
    const timestamp = Date.now();
    const filePath = `./Uploads/resume_${timestamp}.pdf`;

    const htmlContent = generateResumeHTML(resumeData);
    await generatePDF(htmlContent, filePath);

    // Upload file to Akave
    const uploadedFile = await uploadFileToAkave("Resumes", filePath);

    // Remove local PDF file after upload
    fs.unlinkSync(filePath);

    // Return structured JSON resume and file URL
    res.json({
      resume: resumeData,
      fileUrl: uploadedFile,
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

// Helper function to parse AI-generated resume text into structured JSON
function parseResumeText(text, inputData) {
  const resumeData = {
    name: inputData.name,
    contact: {
      phone: inputData.phone,
      email: inputData.email,
      linkedin: inputData.linkedin,
      github: inputData.github,
      portfolio: inputData.portfolio,
    },
    profile: "",
    skills: inputData.skills.split(",").map(s => s.trim()),
    experience: [],
    education: inputData.education,
    projects: inputData.projectSummaries,
    certifications: inputData.certifications,
    achievements: inputData.achievements,
    awards: inputData.awards,
    languages: inputData.languages,
  };

  const lines = text.split("\n").map(line => line.trim());
  let currentSection = "";

  lines.forEach(line => {
    if (line.startsWith("**") && line.endsWith("**")) {
      currentSection = line.replace(/\*\*/g, "").toUpperCase();
    } else if (line && currentSection) {
      switch (currentSection) {
        case "PROFILE":
          resumeData.profile = (resumeData.profile ? resumeData.profile + " " : "") + line;
          break;
        case "EXPERIENCE":
          if (line.startsWith("-")) {
            if (resumeData.experience.length === 0) {
              resumeData.experience.push({ title: inputData.experience, details: [] });
            }
            resumeData.experience[0].details.push(line.replace("- ", ""));
          } else if (resumeData.experience.length > 0 && line.trim()) {
            resumeData.experience[0].details.push(line);
          }
          break;
        default:
          break;
      }
    }
  });

  // Fallbacks
  if (!resumeData.profile) {
    resumeData.profile = `Experienced ${inputData.role} with ${inputData.experienceDuration} years at ${inputData.companyName}. Skilled in ${inputData.skills}, with notable achievements like ${inputData.achievements}. Passionate about leveraging technology to solve real-world problems and contribute to innovative projects.`;
  }
  if (resumeData.experience.length === 0 || resumeData.experience[0].details.length === 0) {
    resumeData.experience = [
      {
        title: inputData.experience,
        details: [
          `Contributed to projects at ${inputData.companyName} using ${inputData.skills}.`,
          "Collaborated with teams to deliver high-quality solutions.",
          "Gained hands-on experience in a professional environment.",
        ],
      },
    ];
  }

  return resumeData;
}

// Helper function to generate HTML for PDF
function generateResumeHTML(resumeData) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #1a202c; margin: 20px; }
          .container { max-width: 800px; margin: auto; }
          .header { text-align: center; }
          .name { font-size: 24px; font-weight: bold; color: #4f46e5; }
          .role { font-size: 18px; color: #4b5563; }
          .flex { display: flex; }
          .left-column { width: 33%; padding-right: 20px; border-right: 1px solid #e5e7eb; }
          .right-column { width: 67%; padding-left: 20px; }
          .section-title { font-size: 14px; font-weight: bold; color: #4f46e5; text-transform: uppercase; margin-top: 20px; }
          .text { font-size: 12px; color: #4b5563; margin-top: 8px; }
          .list { list-style: none; padding: 0; }
          .list li { display: flex; align-items: flex-start; margin-top: 4px; }
          .list li::before { content: "•"; margin-right: 8px; }
          a { color: #4f46e5; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="name">${resumeData.name}</div>
            <div class="role">Blockchain Developer</div>
          </div>
          <div class="flex">
            <div class="left-column">
              <div class="section-title">Contact</div>
              <div class="text">
                <p>📞 <a href="tel:${resumeData.contact.phone}">${resumeData.contact.phone}</a></p>
                <p>📧 <a href="mailto:${resumeData.contact.email}">${resumeData.contact.email}</a></p>
                <p>🔗 <a href="${resumeData.contact.linkedin}" target="_blank">LinkedIn</a></p>
                <p>💻 <a href="${resumeData.contact.github}" target="_blank">GitHub</a></p>
                <p>🌐 <a href="${resumeData.contact.portfolio}" target="_blank">Portfolio</a></p>
              </div>
              <div class="section-title">Skills</div>
              <ul class="list">
                ${resumeData.skills.map(skill => `<li>${skill}</li>`).join("")}
              </ul>
              <div class="section-title">Languages</div>
              <ul class="list">
                <li>${resumeData.languages}</li>
              </ul>
            </div>
            <div class="right-column">
              <div class="section-title">Profile</div>
              <div class="text">${resumeData.profile}</div>
              <div class="section-title">Experience</div>
              ${resumeData.experience
                .map(
                  exp => `
                  <div class="text">
                    <strong>${exp.title}</strong>
                    <ul class="list">
                      ${exp.details.map(detail => `<li>${detail}</li>`).join("")}
                    </ul>
                  </div>
                `
                )
                .join("")}
              <div class="section-title">Education</div>
              <div class="text">${resumeData.education}</div>
              <div class="section-title">Projects</div>
              ${resumeData.projects
                .map(
                  project => `
                  <div class="text">
                    <strong>${project.name} (${project.techStack})</strong>
                    <p><a href="${project.liveLink}" target="_blank">View Project</a></p>
                    <p>${project.summary}</p>
                  </div>
                `
                )
                .join("")}
              <div class="section-title">Certifications</div>
              <div class="text">${resumeData.certifications}</div>
              <div class="section-title">Achievements & Awards</div>
              <ul class="list">
                <li>${resumeData.achievements}</li>
                <li>${resumeData.awards}</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Helper function to generate PDF using Puppeteer
async function generatePDF(htmlContent, filePath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({
    path: filePath,
    format: "A4",
    margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
  });
  await browser.close();
}

async function uploadFileToAkave(bucketName, filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  try {
    const response = await axios.post(`http://localhost:8000/buckets/${bucketName}/files`, form, {
      headers: form.getHeaders(),
    });
    console.log("Response from upload to Akave:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file to Akave:", error.message);
    throw error;
  }
}

async function generateProjectSummary(description, techStack) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Summarize the following project description in 50-70 words, including details about technologies used (e.g., ${techStack}), key features implemented, and the project's impact:",
        },
        {
          role: "user",
          content: description,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating project summary:", error);
    return `Developed a project using ${techStack}. Details unavailable due to an error.`;
  }
}

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

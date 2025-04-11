# 🎉 AI-Powered Resume Builder with Decentralized Storage - CVault 🎉

Welcome to **CVault** - an innovative AI-driven resume builder that leverages the power of decentralized storage with **Akave** and **Filecoin**, smart contract deployment with **Hardhat** on the **Filecoin Virtual Machine (FVM)**, and seamless integration with Docker. This project allows users to input their details, generate a professionally styled resume with templates, and download it directly via Akave's decentralized storage. In the future, users will be able to retrieve and share their resumes using their wallet address!

---

## 🚀 Project Overview

- **What is CVault?**  
  CVault is an AI-powered tool that generates tailored resumes based on user-provided details (name, education, experience, skills, etc.). Using advanced AI, it creates resumes with customizable templates and stores them securely on the decentralized Akave network, powered by Filecoin. The project utilizes FVM smart contracts for decentralized functionality and ensures data permanence.

- **Key Features** 🌟:
  - Input your personal details to generate a resume.
  - Choose from pre-designed templates for a professional look.
  - Download your resume directly from Akave's decentralized storage.
  - Future-proof: Retrieve and share resumes using your wallet address.
  - Secure, immutable storage with Filecoin integration.

- **Tech Stack** 💻:
  - **AI**: Powered by OpenAI for resume generation.
  - **Decentralized Storage**: Akave CLI SDK and Filecoin.
  - **Smart Contracts**: Hardhat for FVM deployment.
  - **Containerization**: Docker for local development and deployment.
  - **Backend**: Node.js with Express.

---

## 🎨 Getting Started

### Prerequisites 📋
- Node.js (v16 or later)
- npm or yarn
- Docker
- Akave CLI SDK (installed and configured)
- Hardhat (for FVM smart contract deployment)
- MetaMask or compatible wallet (for interacting with FVM)
- Filecoin wallet with FIL (for storage deals)

### Installation 🛠️
1. Clone the repository:
   ```bash
   git clone https://github.com/Sukhdevsingh123/AiPowered_ResumeBuilder
   cd AiPowered_ResumeBuilder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables: Create a .env file in the root directory and add:
   ```text
   OPENAI_API_KEY=your_openai_api_key
   NODE_ADDRESS=connect.akave.ai:5500
   ```
4. Start the Docker container:
   ```bash
   docker run -d -p 8000:3000 -e NODE_ADDRESS="connect.akave.ai:5500" -e PRIVATE_KEY="your_wallet_private_key" akave/akavelink:latest
   ```
5. Compile and deploy the FVM smart contract using Hardhat:
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network filecoin
   ```

---

## 🮣 Akave CLI SDK Commands & API for Bucket Creation

CVault uses Akave's decentralized storage to store resumes securely. Below are the commands and API endpoints to create a bucket and interact with Akave.

### Akave CLI Commands 🖥️

**Install Akave CLI:**
```bash
npm install -g @akave/cli
```

**Login to Akave:**
```bash
akave login --api-key your_akave_api_key
```

**Create a Bucket:**
```bash
akave bucket create --name resumes --region us-east
```

**List Buckets:**
```bash
akave bucket list
```

**Upload a File to Bucket:**
```bash
akave file upload --bucket resumes --file ./path/to/resume.pdf
```

**Download a File:**
```bash
akave file download --bucket resumes --file resume.pdf --output ./downloaded_resume.pdf
```

### Akave API Endpoints 🌐

**Create Bucket:**
```bash
curl -X POST http://localhost:8000/buckets \
     -H "Authorization: Bearer your_akave_api_key" \
     -d '{"name": "resumes", "region": "us-east"}'
```

**List Buckets:**
```bash
curl -X GET http://localhost:8000/buckets \
     -H "Authorization: Bearer your_akave_api_key"
```

**Upload File:**
```bash
curl -X POST http://localhost:8000/buckets/resumes/files \
     -H "Authorization: Bearer your_akave_api_key" \
     -F "file=@/path/to/resume.pdf"
```

**Download File:**
```bash
curl -X GET http://localhost:8000/buckets/resumes/files/resume.pdf/download \
     -H "Authorization: Bearer your_akave_api_key" \
     -o downloaded_resume.pdf
```

> Note: Ensure the AKAVE_BACKEND_URL in your .env file matches your Docker container's port if customized.

---

## 🚢 Docker Interaction

CVault uses Docker for a streamlined development and deployment process. The `akave/akavelink:latest` image runs the Akave backend. Customize the port mapping if needed:

```bash
docker run -d -p 8000:3000 -e NODE_ADDRESS="connect.akave.ai:5500" -e PRIVATE_KEY="your_wallet_private_key" akave/akavelink:latest
```

To stop the container:
```bash
docker stop <container_id>
```

---

## ⚙️ FVM Smart Contract Deployment with Hardhat

CVault deploys smart contracts on the Filecoin Virtual Machine (FVM) using Hardhat for decentralized resume management.

### Deployment Steps

**Configure Hardhat:**  
Update `hardhat.config.js` with your Filecoin network details:
```javascript
module.exports = {
  solidity: "0.8.0",
  networks: {
    filecoin: {
      url: "https://filecoin-calibration.chainstacklabs.com/rpc/v1",
      accounts: ["your_private_key"]
    }
  }
};
```

**Deploy the Contract:**
```bash
npx hardhat run scripts/deploy.js --network filecoin
```

**Verify the Contract:**  
Use a Filecoin block explorer (e.g., Filfox) to verify the deployed contract address.

### Sample Contract (contracts/Resume.sol)

---

## 📝 Using CVault

**Enter Your Details:**  
Run the app locally with `npm start`. Fill in your name, education, experience, skills, and other details in the form.

**Generate Resume:**  
Click "Generate Resume" to let the AI create a tailored resume with a selected template.

**Download Resume:**  
Download your resume directly from Akave by clicking the "Download from Akave" button.

**Future Feature:**  
In future updates, use your wallet address to retrieve and share your resume securely.

---

## 🌐 Future Roadmap

- 🔒 Enable wallet-address-based resume retrieval.  
- 📄 Add resume sharing functionality.  
- 🎨 Introduce more resume templates.  
- ⚡ Optimize AI generation speed.  
- 🌍 Expand support for multi-chain storage.  

---

## 🤝 Contributing

We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request. Join our community to collaborate:

- **Issues**: Report bugs or suggest features here.
- **Discord**: Join our Discord server for discussions.

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments
- **Akave** for decentralized storage solutions.
- **Filecoin** for robust decentralized infrastructure.
- **Hardhat** for seamless FVM deployment.
- **OpenAI** for AI-powered resume generation.

---

🌟 Star this repo if you find it useful! 🌟

📢 Stay tuned for updates and let’s build the future of decentralized resumes together! 📢

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResumeStorage {
    struct Resume {
        string cid; // Filecoin CID (Content Identifier)
        address owner;
        uint256 timestamp;
        bool downloaded;
    }

    mapping(address => Resume) public resumes;
    event ResumeUploaded(address indexed user, string cid, uint256 timestamp);
    event ResumeDownloaded(address indexed user, string cid, uint256 timestamp);

    // Upload resume to Filecoin (via Akave)
    function uploadResume(string memory _cid) external {
        require(bytes(_cid).length > 0, "Invalid CID");

        resumes[msg.sender] = Resume({
            cid: _cid,
            owner: msg.sender,
            timestamp: block.timestamp,
            downloaded: false
        });

        emit ResumeUploaded(msg.sender, _cid, block.timestamp);
    }

    // Mark resume as downloaded
    function downloadResume() external {
        require(bytes(resumes[msg.sender].cid).length > 0, "No resume uploaded");
        require(!resumes[msg.sender].downloaded, "Already downloaded");

        resumes[msg.sender].downloaded = true;
        emit ResumeDownloaded(msg.sender, resumes[msg.sender].cid, block.timestamp);
    }

    // Get Resume details
    function getResume(address user) external view returns (string memory, uint256, bool) {
        Resume memory resume = resumes[user];
        return (resume.cid, resume.timestamp, resume.downloaded);
    }
}
// 0x38bedb56679d15d937f4974448d57DDd24Ad81e2









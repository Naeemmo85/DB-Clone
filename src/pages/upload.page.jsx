import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFile = {
      fileName,
      folder,
      description,
      date: new Date().toLocaleDateString(),
    };

    const existingFiles = JSON.parse(localStorage.getItem("files")) || [];
    const updatedFiles = [...existingFiles, newFile];
    localStorage.setItem("files", JSON.stringify(updatedFiles));

    setFileName("");
    setFolder("");
    setDescription("");

    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo"><h2>illyBox</h2></div>
        <nav>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/file")}>Files</p>
          <p className="active-link">Images</p>
          <p>Shared</p>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

        <div className="top-bar">
          <h1>Upload File</h1>
          <button className="back-btn" onClick={() => navigate("/")}>← Back to Dashboard</button>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div>
            <label>File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. resume.pdf"
            />
          </div>

          <div>
            <label>Folder:</label>
            <input
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="e.g. School, Work"
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short description..."
            />
          </div>

          <div>
            <label>Select File:</label>
            <input type="file" />
          </div>

          <button type="submit" className="upload-btn">Upload</button>
        </form>

      </div>
    </div>
  );
};
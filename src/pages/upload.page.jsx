import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../context/FilesContext";
import { useTheme } from "../context/ThemeContext";
import { StorageBar } from "../components/StorageBar";

export const Upload = () => {
  const navigate = useNavigate();
  const { addFile } = useFiles();
  const { darkMode, toggleDarkMode } = useTheme();

  const [fileName,    setFileName]    = useState("");
  const [folder,      setFolder]      = useState("");
  const [description, setDescription] = useState("");
  const [size,        setSize]        = useState("");
  const [fileInput,   setFileInput]   = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newFile = {
      id:          Date.now(),
      name:        fileName.trim(),
      folder:      folder.trim() || "General",
      description: description.trim(),
      date:        new Date().toLocaleDateString("en-US"),
      size:        size.trim() || "—",
      status:      "private",
    };

    addFile(newFile);
    setFileName("");
    setFolder("");
    setDescription("");
    setSize("");
    setFileInput(null);
    navigate("/");
  };

  return (
    <div className="dashboard-layout">

      <div className="sidebar">
        <div className="logo"><h2>illyBox</h2></div>
        <nav>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/file")}>Files</p>
          <p className="active-link">Upload</p>
          <p>Shared</p>
          <StorageBar />
          <button className="dark-mode-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </nav>
      </div>

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
              required
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
            <label>File Size:</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 2.4 MB, 340 KB"
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
            <input
              type="file"
              onChange={(e) => setFileInput(e.target.files[0] || null)}
            />
          </div>

          <button type="submit" className="upload-btn">Upload</button>
        </form>
      </div>
    </div>
  );
};
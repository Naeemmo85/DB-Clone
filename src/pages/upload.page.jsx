import { useState } from "react";
import { Link } from "react-router-dom";

export const Upload = () => {
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
  };

  return (
    <div className="upload">
      <h1>Upload File</h1>

      <Link to="/">
        <button className="back-btn">← Back to Dashboard</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label>File Name:</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>

        <div>
          <label>Folder:</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Select File:</label>
          <input type="file" />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
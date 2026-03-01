import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("files")) || [];
    setFiles(savedFiles);
  }, []);

  return (
    <div className="dashboard">
      <h1>My Files</h1>

      <Link to="/upload">
        <button>Upload New File</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Folder</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.fileName}</td>
              <td>{file.folder}</td>
              <td>{file.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
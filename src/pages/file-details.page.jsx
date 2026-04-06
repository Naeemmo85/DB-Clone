import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const File = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    { name: "Project Brief.pdf", type: "pdf", size: "2.4 MB", modified: "Apr 4, 2026", status: "shared" },
    { name: "Wireframes.png", type: "img", size: "8.1 MB", modified: "Apr 3, 2026", status: "shared" },
    { name: "App.jsx", type: "doc", size: "12 KB", modified: "Apr 5, 2026", status: "private" },
    { name: "Notes.docx", type: "doc", size: "340 KB", modified: "Apr 2, 2026", status: "private" },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">

    
      <div className="sidebar">
        <div className="logo"><h2>illyBox</h2></div>
        <nav>
          <p onClick={() => navigate("/")}>Home</p>
          <p className="active-link" onClick={() => navigate("/file")}>Files</p>
          <p>Images</p>
          <p>Shared</p>
        </nav>
      </div>

    
      <div className="dashboard-content">

        <div className="top-bar">
          <h1>Files</h1>
          <input className="search-bar" type="text" placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="file-detail-header">
          <div className="file-detail-header-left">
            <div>
              <div className="file-detail-title">My Files</div>
              <div className="file-detail-subtitle">{files.length} files</div>
            </div>
          </div>
          <div className="file-detail-btn-row">
            <button className="upload-btn" onClick={() => navigate("/upload")}>+ Upload New File</button>
          </div>
        </div>

        <div className="file-stats">
          <div className="stat-card">
            <div className="stat-card-label">Total files</div>
            <div className="stat-card-value">{files.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Storage used</div>
            <div className="stat-card-value">48 MB</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Shared with</div>
            <div className="stat-card-value">3</div>
          </div>
        </div>

        <div className="file-table">
          <div className="file-table-header">
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
            <span>Status</span>
          </div>
          {filtered.map((file, i) => (
            <div className="file-row" key={i} onClick={() => setSelectedFile(file)}>
              <span>{file.name}</span>
              <span>{file.size}</span>
              <span>{file.modified}</span>
              <span>{file.status}</span>
            </div>
          ))}
        </div>

        {selectedFile && (
          <div className="file-selected-panel">
            <h2>{selectedFile.name}</h2>
            <p>Size: {selectedFile.size}</p>
            <p>Modified: {selectedFile.modified}</p>
            <p>Status: {selectedFile.status}</p>
            <button onClick={() => setSelectedFile(null)}>Close</button>
          </div>
        )}

      </div>
    </div>
  );
};
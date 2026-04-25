import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../context/FilesContext";
import { useTheme } from "../context/ThemeContext";
import { StorageBar } from "../components/StorageBar";

export const File = () => {
  const navigate = useNavigate();
  const { files, deleteFile } = useFiles();
  const { darkMode, toggleDarkMode } = useTheme();

  const [selectedFile, setSelectedFile] = useState(null);
  const [search,       setSearch]       = useState("");
  const [sortBy,       setSortBy]       = useState("date-desc");

  const sortedFiltered = useMemo(() => {
    const searched = files.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );

    return [...searched].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":  return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "date-asc":  return new Date(a.date) - new Date(b.date);
        case "date-desc": return new Date(b.date) - new Date(a.date);
        case "size":      return parseFloat(a.size) - parseFloat(b.size);
        case "status":    return a.status.localeCompare(b.status);
        default:          return 0;
      }
    });
  }, [files, search, sortBy]);

  const totalStorageMB = files.reduce((sum, f) => {
    const match = f.size.match(/([\d.]+)\s*(KB|MB)/i);
    if (!match) return sum;
    const val = parseFloat(match[1]);
    return sum + (match[2].toUpperCase() === "MB" ? val : val / 1024);
  }, 0).toFixed(1);

  const sharedCount = files.filter((f) => f.status === "shared").length;

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
        <StorageBar />
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="dashboard-content">

        <div className="top-bar">
          <h1>Files</h1>
          <input
            className="search-bar"
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            <div className="stat-card-value">{totalStorageMB} MB</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Shared files</div>
            <div className="stat-card-value">{sharedCount}</div>
          </div>
        </div>

        <div className="sort-bar">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="size">Size</option>
            <option value="status">Status</option>
          </select>
        </div>

        <div className="file-table">
          <div className="file-table-header">
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
            <span>Status</span>
          </div>

          {sortedFiltered.length === 0 && (
            <p style={{ padding: "20px", color: "#888" }}>No files found.</p>
          )}

          {sortedFiltered.map((file) => (
            <div className="file-row" key={file.id} onClick={() => setSelectedFile(file)}>
              <span>{file.name}</span>
              <span>{file.size}</span>
              <span>{file.date}</span>
              <span>{file.status}</span>
            </div>
          ))}
        </div>

        {selectedFile && (
          <div className="file-selected-panel">
            <h2>{selectedFile.name}</h2>
            <p><strong>Folder:</strong> {selectedFile.folder}</p>
            <p><strong>Size:</strong> {selectedFile.size}</p>
            <p><strong>Modified:</strong> {selectedFile.date}</p>
            <p><strong>Status:</strong> {selectedFile.status}</p>
            {selectedFile.description && (
              <p><strong>Description:</strong> {selectedFile.description}</p>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm(`Delete "${selectedFile.name}"?`)) {
                  deleteFile(selectedFile.id);
                  setSelectedFile(null);
                }
              }}
            >
              Delete
            </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFiles } from "../context/FilesContext";
import { useTheme } from "../context/ThemeContext";
import { StorageBar } from "../components/StorageBar";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { files, deleteFile, editFile } = useFiles();
  const { darkMode, toggleDarkMode } = useTheme();

  const [editingFile,     setEditingFile]     = useState(null);
  const [editName,        setEditName]        = useState("");
  const [editFolder,      setEditFolder]      = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [search,          setSearch]          = useState("");
  const [sortBy,          setSortBy]          = useState("date-desc");

  const handleEditClick = (file) => {
    setEditingFile(file);
    setEditName(file.name);
    setEditFolder(file.folder);
    setEditDescription(file.description || "");
  };

  const handleEditSave = () => {
    editFile(editingFile.id, {
      name:        editName,
      folder:      editFolder,
      description: editDescription,
    });
    setEditingFile(null);
  };

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
        case "folder":    return a.folder.localeCompare(b.folder);
        default:          return 0;
      }
    });
  }, [files, search, sortBy]);

  return (
    <div className="dashboard-layout">

      <div className="sidebar">
        <div className="logo"><h2>illyBox</h2></div>
        <nav>
          <p className="active-link">Home</p>
          <p onClick={() => navigate("/file")}>Files</p>
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
          <h1>Home</h1>
          <input
            type="text"
            placeholder="Search files..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="last-login">Last Login: 3 Days Ago</p>

        <div className="dashboard-header">
          <h2>My Files ({files.length})</h2>
          <Link to="/upload">
            <button className="upload-btn">+ Upload New File</button>
          </Link>
        </div>

        <div className="sort-bar">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="folder">Folder</option>
          </select>
        </div>

        <div className="file-table">
          <div className="file-table-header">
            <span>Name</span>
            <span>Folder</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {sortedFiltered.length === 0 && (
            <p style={{ padding: "20px", color: "#888" }}>No files found.</p>
          )}

          {sortedFiltered.map((file) => (
            <div className="file-row" key={file.id}>
              <span>{file.name}</span>
              <span>{file.folder}</span>
              <span>{file.date}</span>
              <span>
                <button onClick={() => handleEditClick(file)}>Edit</button>
                <button onClick={() => {
                  if (window.confirm(`Delete "${file.name}"?`)) {
                    deleteFile(file.id);
                  }
                }}>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {editingFile && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: "20px" }}>Edit File</h2>

            <label>File Name</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <label>Folder</label>
            <input
              value={editFolder}
              onChange={(e) => setEditFolder(e.target.value)}
            />

            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="modal-actions">
              <button className="upload-btn" onClick={handleEditSave}>Save</button>
              <button className="back-btn" onClick={() => setEditingFile(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
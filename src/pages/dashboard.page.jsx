import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="logo">illyBox</h2>
        <nav>
          <p className="active-link">Home</p>
          <p onClick={() => navigate("/file")}>Files</p>
          <p>Images</p>
          <p>Shared</p>
        </nav>
      </aside>

      <main className="dashboard-content">
        <div className="top-bar">
          <h1>Home</h1>
          <input type="text" placeholder="Search files..." className="search-bar" />
        </div>

        <p className="last-login">Last Login: 3 Days Ago</p>

        <div className="dashboard-header">
          <h2>My Files</h2>
          <Link to="/upload">
            <button className="upload-btn">Upload New File</button>
          </Link>
        </div>

        <div className="file-table">
          <div className="file-table-header">
            <span>Name</span>
            <span>Folder</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          <div className="file-row">
            <span>resume.pdf</span>
            <span>School</span>
            <span>04/05/2026</span>
            <span>
              <button>Edit</button>
              <button>Delete</button>
            </span>
          </div>

          <div className="file-row">
            <span>project-notes.docx</span>
            <span>Work</span>
            <span>04/04/2026</span>
            <span>
              <button>Edit</button>
              <button>Delete</button>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
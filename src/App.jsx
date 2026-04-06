import './App.css';
import { Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/dashboard.page';
import { Upload } from './pages/upload.page';
import { File } from './pages/file-details.page';

const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/file" element={<File />} />
      </Routes>
    </div>
  );
};

export default App;
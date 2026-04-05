import './App.css';
import { Routes, Route } from "react-router-dom";
import { Dashboard } from './pages/dashboard.page';
import { Upload } from './pages/upload.page';

const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default App;
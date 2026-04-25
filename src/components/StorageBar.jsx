import { useFiles } from "../context/FilesContext";

const LIMIT_MB = 10; 

export const StorageBar = () => {
  const { files } = useFiles();

  const usedMB = files.reduce((sum, f) => {
    const match = f.size.match(/([\d.]+)\s*(KB|MB|GB)/i);
    if (!match) return sum;
    const val = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    if (unit === "GB") return sum + val * 1024;
    if (unit === "MB") return sum + val;
    if (unit === "KB") return sum + val / 1024;
    return sum;
  }, 0);

  const percent = Math.min((usedMB / LIMIT_MB) * 100, 100).toFixed(1);

  const fillClass =
    percent >= 90 ? "storage-bar-fill danger" :
    percent >= 70 ? "storage-bar-fill warning" :
    "storage-bar-fill";

  const displayUsed =
    usedMB >= 1024
      ? `${(usedMB / 1024).toFixed(2)} GB`
      : `${usedMB.toFixed(1)} MB`;

  return (
    <div className="storage-section">
      <div className="storage-label">Storage</div>
      <div className="storage-bar-track">
        <div className={fillClass} style={{ width: `${percent}%` }} />
      </div>
      <div className="storage-used-text">{displayUsed} of 10 MB used</div>
    </div>
  );
};
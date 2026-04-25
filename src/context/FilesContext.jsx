import { createContext, useContext, useReducer } from "react";

const initialFiles = [
  { id: 1, name: "resume.pdf",         folder: "School", description: "My latest resume",      date: "04/05/2026", size: "2.4 MB",  status: "private" },
  { id: 2, name: "project-notes.docx", folder: "Work",   description: "Sprint planning notes", date: "04/04/2026", size: "340 KB", status: "shared"  },
];

function filesReducer(state, action) {
  switch (action.type) {
    case "ADD_FILE":
      return [...state, action.payload];
    case "DELETE_FILE":
      return state.filter((file) => file.id !== action.payload);
    case "EDIT_FILE":
      return state.map((file) =>
        file.id === action.payload.id ? { ...file, ...action.payload.updates } : file
      );
    default:
      return state;
  }
}

const FilesContext = createContext(null);

export function FilesProvider({ children }) {
  const [files, dispatch] = useReducer(filesReducer, initialFiles);

  const addFile    = (file)        => dispatch({ type: "ADD_FILE",    payload: file });
  const deleteFile = (id)          => dispatch({ type: "DELETE_FILE", payload: id });
  const editFile   = (id, updates) => dispatch({ type: "EDIT_FILE",   payload: { id, updates } });

  return (
    <FilesContext.Provider value={{ files, addFile, deleteFile, editFile }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  return useContext(FilesContext);
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FilesProvider } from './context/FilesContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <FilesProvider>
        <App />
      </FilesProvider>
    </ThemeProvider>
  </BrowserRouter>
);
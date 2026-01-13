import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ми перевіряємо, чи існує element з id="root" (він є в index.html)
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("CRITICAL ERROR: Cannot find root element. Check index.html!");
} else {
  console.log("Prediction Sea: Mounting started...");
  
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
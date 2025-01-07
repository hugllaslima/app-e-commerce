import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App.js file

// Create a root element in the HTML and render the React app to it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

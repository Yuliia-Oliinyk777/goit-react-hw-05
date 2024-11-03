import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
import 'modern-normalize';
import './index.css';
import App from './components/App/App';
// import App from './App';
// import PropTypes from "prop-types";
// import clsx from "clsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

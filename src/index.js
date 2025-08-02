
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // <-- change here
import App from './App';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>   {/* <-- use HashRouter */}
    <App />
  </HashRouter>
);

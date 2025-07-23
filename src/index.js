// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import { BrowserRouter } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom';
// import App from './App';
// import './styles/App.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
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

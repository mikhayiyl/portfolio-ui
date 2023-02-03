import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import './styles/styles.scss';
import App from './App';


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter >,
  document.getElementById('root')
);

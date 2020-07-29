import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { ToastContainer } from "react-toastify";


// Custom Colors
/*
900: "#3D5AFE",
      800: "#8C9EFF",
      700: "#EFE2DD",
      */


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      ></ToastContainer>
      <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

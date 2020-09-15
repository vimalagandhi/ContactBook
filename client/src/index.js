import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import App from "./App";
import { Router, HashRouter, Redirect } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { EnumStore } from "./context/EnumContext";
import axios from "axios";

const token = localStorage.getItem("userToken");
axios.defaults.baseURL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <EnumStore>
        <App />
      </EnumStore>
    </ScrollToTop>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

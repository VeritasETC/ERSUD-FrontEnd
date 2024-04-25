import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./utils/AppContext";
ReactDOM.render(
  <BrowserRouter>
   <AppProvider>
    <App />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();
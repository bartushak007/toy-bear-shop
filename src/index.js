import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";

export const DataContext = React.createContext({});

ReactDOM.render(
  <DataContext.Provider value={data}>
    <App />
  </DataContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

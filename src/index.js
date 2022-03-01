import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(reducer, middleware);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

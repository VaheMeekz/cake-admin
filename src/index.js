import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import store from "./store/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

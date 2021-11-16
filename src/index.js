import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "core-js/features/string/repeat";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "css/index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

import RenderAfterNavermapsLoaded from "./utility/RenderAfterNavermapsLoaded";
import defaultTheme from "./utility/theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RenderAfterNavermapsLoaded ncpClientId="aqsbqnlcf0">
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </RenderAfterNavermapsLoaded>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { RecoilRoot } from "recoil";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById("root")
);

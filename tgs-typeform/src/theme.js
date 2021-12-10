import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#f44336",
    },
    action: {
      disabled: "#f44336",
    },
  },
  spacing: (value) => `${value * 8}px`,
  typography: {
    color: "black",

    root: {
      color: "black",
    },
    body: {
      fontSize: "16px",
    },
    body1: {
      fontSize: "16px",
    },
    h1: {
      fontSize: "3rem",
      lineHeight: "54px",
    },
    h2: {
      fontSize: "2.5rem",
      lineHeight: "48px",
    },
    h3: {
      fontSize: "2rem",
      lineHeight: "36px",
    },
    h4: {
      fontSize: "1.5rem",
      lineHeight: "28px",
    },
    h5: {
      fontSize: "1.125rem",
      lineHeight: "24px",
    },
    h6: {
      fontSize: "1rem",
      lineHeight: "22px",
    },
    caption: {
      fontSize: "0.8rem",
      lineHeight: "24px",
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: "22px",
      fontFamily: "Roboto",
    },
    subtitle2: {
      fontSize: "0.8rem",
      lineHeight: "22px",
      fontFamily: "Roboto",
    },
  },
});
export default theme;

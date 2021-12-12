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
    MuiButton: {
      // Name of the rule
      root: {
        //borderRadius: '20px',
        color: "#00bcd4",
        backgroundColor: "#00bcd4",
        padding: "8px 20px",
        border: "1px solid #00bcd4",
        "&:hover": {
          color: "#00bcd4",
          backgroundColor: "#00bcd4",
          padding: "8px 20px",
          border: "1px solid #00bcd4",
        },
        "&:active": {
          backgroundColor: "#f44336",
          color: "#00bcd4",
          border: "1px solid #00bcd4",
        },
        textTransform: "none",
      },
      outlined: {
        padding: "8px 20px",
      },
      contained: {
        padding: "8px 20px",
      },
      containedPrimary: {
        color: "#f44336",
      },
    },
    MuiSelect: {
      root: { color: "#c0c0c0" },
    },
    MuiList: {
      root: { background: "none" },
    },
    MuiTextField: {
      root: {
        margin: "10px",
        width: "100%",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          //borderRadius: '20px',
          color: "#fff",
          backgroundColor: "#00bcd4",
          padding: "4px 10px",
          border: "1px solid #00bcd4",
          margin: "10px",
          fontSize: "1rem",
          "&:hover": {
            color: "#00bcd4",
            backgroundColor: "#fff",
            border: "1px solid #00bcd4",
          },
          "&:active": {
            // backgroundColor: "alice blue",
            color: "black",
            border: "1px solid #00bcd4",
          },
          textTransform: "none",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        icon: {
          color: "#00bcd4",
          fontSize: "100px",
        },
      },
    },
  },
});
export default theme;

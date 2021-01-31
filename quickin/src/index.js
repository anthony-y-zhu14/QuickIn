import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createMuiTheme, ThemeProvider } from "@material-ui/core";

const colorTheme = createMuiTheme({
  palette:  {
    primary: {
    main: "#6C9FF8;",
    active: "#4f88ed",
    contrastText: '#fff'
    },
    secondary: {
    main: "#B8B9BD",
    }
  },
})
const overridesTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
      backgroundColor: colorTheme.palette.primary.main,
      color: colorTheme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: colorTheme.palette.primary.active,
      },
      },
      outlined: {
        color: colorTheme.palette.primary.main,
        "&:hover": {
          backgroundColor: colorTheme.palette.primary.active,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        position: "relative",
        marginTop: "5%",
        "& $notchedOutline": {
          borderColor: "#000"
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#6C9FF8",

          "@media (hover: none)": {
            marginTop: "5%",
            borderColor: "#6C9FF8"
          }
        },
        "&$focused $notchedOutline": {
          borderColor: "#6C9FF8",
          borderWidth: 1
        }
      }
    },
    MuiFormLabel: {
      root: {
        marginTop: "5%",
        color: "#000"
      }
    }
  }
})

const themes = createMuiTheme({
  palette: colorTheme.palette,
  overrides: overridesTheme.overrides
})


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);


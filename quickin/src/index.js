import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette:
  {
    primary: {
    main: "#6C9FF8;"
    },
    secondary: {
    main: "#B8B9BD",
    }
  },

  overrides: {
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);


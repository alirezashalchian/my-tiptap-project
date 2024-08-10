import "@fontsource/inter";
import * as React from "react";
import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import "../styles/globals.css";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          900: "#000",
          100: "#fff",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}

export default MyApp;

import React from "react";
import { store } from "store/store";
import { theme } from "theme/theme";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { GlobalStyles } from "css/globalStyles";
import MainLayout from "./layout/MainLayout/MainLayout";
import "normalize.css";
import { FontStyles } from "css/fontStyles";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainLayout />
        <GlobalStyles />
        <FontStyles />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

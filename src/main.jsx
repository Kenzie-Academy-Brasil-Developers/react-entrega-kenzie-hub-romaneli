import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { Providers } from "./contexts/UserContext";
import { TechProviders } from "./contexts/TechContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Providers>
        <TechProviders>
          <App />
        </TechProviders>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);

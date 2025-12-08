import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { FilterProvider } from "./context/FilterContext";

// ⬇️ Import axios token setter
import { setAuthToken } from "./api/auth";

// ⬇️ Auto-apply token on refresh
const token = localStorage.getItem("authToken");
if (token) setAuthToken(token);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

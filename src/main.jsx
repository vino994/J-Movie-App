import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { FilterProvider } from "./context/FilterContext"; // ✅ new

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     
        <FilterProvider>
          <App />
        </FilterProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);

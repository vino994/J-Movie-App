import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="px-3 py-1 border rounded border-black dark:border-white"
    >
      {mode === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

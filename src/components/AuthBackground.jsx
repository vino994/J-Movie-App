import React, { useEffect, useState } from "react";
import { movieBackgrounds } from "../utils/backgrounds";

export default function AuthBackground({ children }) {
  const [index, setIndex] = useState(0);

  // Auto slideshow every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movieBackgrounds.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const bg = movieBackgrounds[index];

  return (
    <div
      className="h-screen w-full flex items-center justify-center relative text-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Dark Blur Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Gradient Fade (Netflix style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

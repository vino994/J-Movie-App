import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, onRate }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1 justify-center">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <FaStar
            key={starValue}
            size={22}
            className={`cursor-pointer transition-colors duration-200 ${
              starValue <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
            onClick={() => onRate(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
}

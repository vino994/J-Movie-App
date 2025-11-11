import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function RatingStars({ movieId }) {
  const [rating, setRating] = useState(0);

  // Load stored rating
  useEffect(() => {
    const saved = localStorage.getItem(`rating_${movieId}`);
    if (saved) setRating(Number(saved));
  }, [movieId]);

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${movieId}`, value);
  };

  return (
    <div className="flex justify-center md:justify-start gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={20}
          className={`cursor-pointer transition ${
            value <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleRating(value)}
        />
      ))}
    </div>
  );
}

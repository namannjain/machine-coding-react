import React, { useState } from 'react';
import '../styles/star.css';

function StarRating({ starCount = 5 }) {
  const [starValue, setStarValue] = useState();
  const [hoverValue, setHoverValue] = useState(0);
  return (
    <div className="container">
      {new Array(starCount).fill(0).map((value, index) => {
        return (
          <span
            key={index}
            className={
              (hoverValue === 0 && index < starValue) || index < hoverValue
                ? "gold cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => setStarValue(index + 1)}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(0)}
          >
            &#9733;
          </span>
        )
      })}
    </div>
  );
}

export default StarRating
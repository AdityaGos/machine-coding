import React, { useState } from "react";
import "./StarRating.css";
import Star from "./Star";

const NUMBER_OF_STARS = 5;

export const StarRating = ({
  value = 0,
  onChange,
  numberOfStar = NUMBER_OF_STARS,
}) => {
  const [clickedIndex, setClickedIndex] = useState(value - 1);
  const [hoverIndex, setHoverIndex] = useState(-1);
  function handleClick(e, index) {
    const button = e.currentTarget;

    // Get width
    const width = button.offsetWidth;

    // Get x position of the click inside the button
    const clickX = e.nativeEvent.offsetX;

    // Example: check if clicked on left or right half
    if (clickX < width / 2) {
      setClickedIndex(index - 0.5);
      onChange(index + 1 - 0.5);
      console.log(`Clicked LEFT half of star ${index}`);
    } else {
      console.log(`Clicked RIGHT half of star ${index}`);
      setClickedIndex(index);
      onChange(index + 1);
    }
  }

  function handleHover(index) {
    setHoverIndex(index);
  }
  // console.log('rendering')
  // cannot map over new Array(size) because index are not initialized
  return (
    <div className="star-rating">
      {[...new Array(numberOfStar)].map((_, index) => {
        let starClassName = "";

        if (index <= clickedIndex) {
          starClassName = "active";
        }
        if (index <= hoverIndex && hoverIndex !== -1) {
          starClassName += " hover";
        }
        if (clickedIndex === index - 0.5) {
          console.log("inside our condition");
          starClassName = "half";
        }
        return (
          <button
            key={index}
            className={starClassName}
            onClick={(e) => handleClick(e, index)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            <Star key={index} />
          </button>
        );
      })}
    </div>
  );
};

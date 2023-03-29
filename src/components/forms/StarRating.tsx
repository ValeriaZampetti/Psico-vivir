import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";

interface StarRatingProps {
  currentRating: number;
  handleCurrentRating: (rating: number) => void;
  /**
   * It is necessary to pass at least the width or height of the svg
   */
  svgClass: string;
  readonly?: boolean;
}

function StarRating(props: StarRatingProps) {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex flex-row justify-center">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={ratingValue}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                if (!props.readonly) {
                  props.handleCurrentRating(ratingValue);
                }
              }}
            />
            <StarIcon
              fill={
                ratingValue <= (hover || props.currentRating) ? "#49a3a2" : "#e4e5e9"
              }
              className={`w-auto ${props.svgClass} ${
                props.readonly ? "cursor-default" : "cursor-pointer"
              }
              ${(ratingValue <= hover && hover != 0) ? "scale-125" : ""}`}
              onMouseEnter={() => {
                if (!props.readonly) {
                  setHover(ratingValue);
                }
              }}
              onMouseLeave={() => {
                if (!props.readonly) {
                  setHover(0);
                }
              }}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;

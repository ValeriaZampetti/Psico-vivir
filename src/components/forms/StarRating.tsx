import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../../assets/icons/star.svg";

interface StarRatingProps {
  rating: number;
  height: number;
  readonly?: boolean;
}

function StarRating(props: StarRatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(props.rating);
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
                  setCurrentRating(ratingValue);
                }
              }}
            />
            <StarIcon
              fill={ratingValue <= (hover || currentRating) ? "#EF5DA8" : "#e4e5e9"}
              className={`w-auto h-[${props.height}rem] ${
                props.readonly ? "cursor-default" : "cursor-pointer"
              }`}
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
            {/* <img
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              className={`w-auto h-[${props.height}rem] ${
                props.readonly ? "cursor-default" : "cursor-pointer"
              }`}
              src={starIcon}
            ></img> */}
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;

import React from "react";
import { Rating } from "@mui/material";

// isAccessRating - если есть доступ к рейтингу
const RatingStars = ({ ratingChanged, ratingVal, isAuth, isAccessRating }) => {
  // console.log("isAuth: " + isAuth, "isAccessRating: " + isAccessRating);

  return (
    <>
      {isAuth && isAccessRating && (
        <>
          <Rating
            name="simple-controlled"
            onChange={(event, newValue) => {
              ratingChanged(newValue);
            }}
            precision={1}
            size="large"
          />
          <p>Доступ к изменению рейтинга есть</p>
        </>
      )}

      {!isAuth && isAccessRating && (
        <>
          <Rating name="read-only" value={ratingVal} readOnly size="large" />
          <p>Доступа к изменению рейтинга нет</p>
        </>
      )}
      {isAuth && !isAccessRating && (
        <>
          <Rating name="read-only" value={ratingVal} readOnly size="large" />
          <p>Доступа к изменению рейтинга нет</p>
        </>
      )}
    </>
  );
};

export default RatingStars;
// https://mui.com/material-ui/react-rating/#rating-precision

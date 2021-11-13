import React from "react";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import "./RecipeCard.css";

const useStyles = makeStyles({
  root: {
    color: "#f76333",
  },
});

function RecipeCard({
  eachRecipe: {
    title,
    image,
    creator: { firstName, lastName },
    rating,
    reviews,
  },
}) {
  const classes = useStyles();
  return (
    <div className="card" style={{ width: "16rem" }}>
      <img src={image} alt={title} className="card-img-top" />
      <div className="card-body">
        <p className="card-text">
          {firstName} {lastName}
        </p>
        <h4 className="card-title">{title}</h4>
        <div className="card-rating">
          <Rating
            className={classes.root}
            defaultValue={rating}
            readOnly
            size="small"
          />
          <span className="card-text card-reviews">{reviews.length}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;

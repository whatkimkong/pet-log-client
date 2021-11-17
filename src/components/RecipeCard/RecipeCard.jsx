import React from "react";
import Rating from "@mui/material/Rating";
import { makeStyles } from "@mui/styles";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";

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
    _id,
  },
}) {
  const classes = useStyles();
  return (
    <div className="card" style={{ width: "16rem" }}>
      <Link to={`${PATHS.RECIPES}/${_id}`} className="card-links">
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
      </Link>
    </div>
  );
}

export default RecipeCard;

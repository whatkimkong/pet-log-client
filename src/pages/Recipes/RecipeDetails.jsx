import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import * as RECIPES_SERVICES from "../../services/recipes";
import * as PATHS from "../../utils/paths";
import LoadingComponent from "../../components/Loading";
import Rating from "@mui/material/Rating";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TimerIcon from "@mui/icons-material/Timer";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
  rootPrivate: {
    color: "white",
  },
  rootPublic: {
    color: "red",
  },
});

function RecipeDetails({ user, setUser }) {
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { recipeId } = useParams();
  const [form, setForm] = useState({
    title: "",
    score: "",
    comment: "",
  });
  const { title, score, comment } = form;
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      title,
      score,
      comment,
      creator: user._id,
    };
    RECIPES_SERVICES.createReview(recipeId, data)
      .then((res) => {
        console.log(res.data.recipe);
        setSingleRecipe(res.data.recipe);
        setForm({ title: "", score: "", comment: "" });
        setShow(true);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleAddToFavs() {
    RECIPES_SERVICES.addToFavs(recipeId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleRemoveFromFavs() {
    RECIPES_SERVICES.removeFromFavs(recipeId)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleDeleteRecipe() {
    RECIPES_SERVICES.removeFromFavs(recipeId)
      .then((res) => {
        setUser(res.data.user);
        return RECIPES_SERVICES.deleteRecipe(recipeId);
      })
      .then((res) => {
        navigate(PATHS.RECIPES);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    RECIPES_SERVICES.getOne(recipeId)
      .then((res) => {
        setSingleRecipe(res.data);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, [setSingleRecipe, setUser]);

  return (
    <div className="public__container">
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <div className="recipe-details__container">
          <h3
            className="h3__title"
            style={{ color: user ? "white" : "black", marginBottom: "2vh" }}
          >
            {singleRecipe.title}
          </h3>
          {singleRecipe.image && (
            <img
              src={singleRecipe.image}
              alt={singleRecipe.title}
              className="recipe-details__img"
            />
          )}
          <div className="recipe-details__card-rating">
            <Rating
              className={user ? classes.rootPrivate : classes.rootPublic}
              id="rating-private"
              value={singleRecipe.rating}
              precision={0.5}
              readOnly
              size="small"
            />
            <span
              className="card-text card-reviews"
              style={{
                color: user ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
              }}
            >
              {singleRecipe.reviews.length}
            </span>
          </div>
          <p
            className="recipe-details__creator"
            style={{
              color: user ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            by {singleRecipe.creator.firstName} {singleRecipe.creator.lastName}
          </p>
          <div className="recipe-details__subcontainer chips-container">
            <Chip
              icon={<AssessmentIcon style={{ color: "white" }} />}
              label={singleRecipe.difficulty}
              style={{
                color: "white",
                backgroundColor: !user && "#f76333",
              }}
            />
            <Chip
              icon={<TimerIcon style={{ color: "white" }} />}
              label={`${singleRecipe.time} min`}
              style={{
                color: "white",
                backgroundColor: !user && "#f76333",
              }}
            />
          </div>
          <div
            className="recipe-details__ingredient recipe-details__subcontainer"
            style={{ color: user ? "white" : "black" }}
          >
            <h5 className="subcontainer-title">Ingredients:</h5>
            <p
              className="subcontainer-description"
              style={{
                color: user ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
              }}
            >
              {singleRecipe.ingredients}
            </p>
          </div>
          <div
            className="recipe-details__preparation recipe-details__subcontainer"
            style={{ color: user ? "white" : "black" }}
          >
            <h5 className="subcontainer-title">Preparation:</h5>
            <p
              className="subcontainer-description"
              style={{
                color: user ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
              }}
            >
              {singleRecipe.preparation}
            </p>
          </div>
          {user && (
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
              elevation={3}
            >
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label="Back"
                  icon={<ArrowBackIcon />}
                  onClick={() => navigate(PATHS.RECIPES)}
                />
                <BottomNavigationAction
                  label={
                    !user.favRecipes.includes(singleRecipe._id)
                      ? "Add"
                      : "Remove"
                  }
                  icon={
                    !user.favRecipes.includes(singleRecipe._id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )
                  }
                  onClick={
                    !user.favRecipes.includes(singleRecipe._id)
                      ? handleAddToFavs
                      : handleRemoveFromFavs
                  }
                />
                {user.email === singleRecipe.creator.email && (
                  <BottomNavigationAction
                    label="Edit"
                    icon={<EditIcon />}
                    onClick={() =>
                      navigate(`${PATHS.RECIPES}/${singleRecipe._id}/edit`)
                    }
                  />
                )}
                {user.email === singleRecipe.creator.email && (
                  <BottomNavigationAction
                    label="Delete"
                    icon={<DeleteIcon />}
                    onClick={handleDeleteRecipe}
                  />
                )}
              </BottomNavigation>
            </Paper>
          )}
          <hr style={{ color: user ? "white" : "#f76333" }} />
          <h5 style={{ color: user ? "white" : "black", marginTop: "5vh" }}>
            Reviews
          </h5>
          {user && (
            <div>
              <div className="add-review-container">
                <button
                  className="button__submit btn-light btn add-review__btn"
                  type="button"
                  onClick={() => setShow(!show)}
                >
                  Add a review
                </button>
                <form
                  onSubmit={handleSubmit}
                  className="add-recipe__form"
                  hidden={show}
                >
                  <TextField
                    type="text"
                    name="title"
                    value={title}
                    helperText="Define the title"
                    onChange={handleChange}
                    className={classes.root}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginBottom: "2vh",
                    }}
                    InputLabelProps={{
                      style: { color: "rgba(0, 0, 0, 0.6)" },
                    }}
                  />
                  <TextField
                    type="number"
                    name="score"
                    value={score}
                    onChange={handleChange}
                    className={classes.root}
                    variant="outlined"
                    fullWidth
                    helperText="Score"
                    style={{
                      marginBottom: "2vh",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <p
                            style={{ color: "rgba(0, 0, 0, 0.6)", margin: "0" }}
                          >
                            min 1 max 5
                          </p>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="text"
                    name="comment"
                    value={comment}
                    helperText="Comment"
                    onChange={handleChange}
                    className={classes.root}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    style={{
                      marginBottom: "2vh",
                    }}
                    InputLabelProps={{
                      style: { color: "rgba(0, 0, 0, 0.6)" },
                    }}
                  />
                  {error && (
                    <div className="error-block">
                      <p className="auth__error">
                        <span>{error}</span>
                      </p>
                    </div>
                  )}
                  <button
                    className="button__submit btn-light btn add-recipe__submit-btn"
                    type="submit"
                    style={{ marginTop: "2vh" }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="reviews-container">
            <ul className="list-group list-group-flush">
              {singleRecipe.reviews.length > 0 &&
                singleRecipe.reviews.map((review) => {
                  return (
                    <li key={review._id} className="list-group-item">
                      <div className="reviews__creator-container">
                        <img
                          src={review.creator.profilePic}
                          alt={review.creator.firstName}
                          className="reviews__profile-pic"
                        />
                        <span>
                          {!review.creator.firstName &&
                            `${user.firstName} ${user.lastName}`}
                          {review.creator.firstName} {review.creator.lastName}
                        </span>
                      </div>
                      <div className="reviews__score-container">
                        <Rating
                          value={review.score}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <span className="reviews__date">
                          {new Date(review.createdAt).toDateString()}
                        </span>
                      </div>
                      <p className="reviews__comment">{review.comment}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

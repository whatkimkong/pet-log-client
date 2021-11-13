import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../utils/muiStyles.jsx";
import * as RECIPES_SERVICES from "../services/recipes";
import * as PATHS from "../utils/paths";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

function Recipes({ user }) {
  const useStyles = makeStyles(!user ? stylesData[0] : stylesData[1]);
  const classes = useStyles();
  const [listOfRecipes, setListOfRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setSearch(value);
  }

  function handleSubmit(event) {
    const { value } = event.target;
    if (event.key === "Enter") {
      setIsLoading(true);
      RECIPES_SERVICES.getFiltered(value)
        .then((res) => {
          setListOfRecipes(res.data);
          setIsLoading(false);
          setSearch("");
        })
        .catch((err) => <Navigate to={PATHS.ERROR500} />);
    }
  }

  function handleFilterSubmit(filter) {
    setIsLoading(true);
    filter === "all" &&
      RECIPES_SERVICES.getAll()
        .then((res) => {
          setListOfRecipes(res.data);
          setIsLoading(false);
        })
        .catch((err) => <Navigate to={PATHS.ERROR500} />);
    filter === "fav" &&
      RECIPES_SERVICES.getFavRecipes()
        .then((res) => {
          setListOfRecipes(res.data);
          setIsLoading(false);
        })
        .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }

  useEffect(() => {
    RECIPES_SERVICES.getAll()
      .then((res) => {
        setListOfRecipes(res.data);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="recipes__container">
      <TextField
        id="outlined"
        className={classes.root}
        value={search}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        multiline
        style={{
          width: user ? "80%" : "90%",
          marginTop: "4vh",
        }}
        maxRows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: user && "white" }} />
            </InputAdornment>
          ),
        }}
      />
      <div className="recipes__btn-filter-container">
        <button
          type="button"
          onClick={() => handleFilterSubmit("all")}
          className={
            user
              ? "btn btn-light btn-filter-recipes"
              : "btn btn-orange btn-filter-recipes"
          }
        >
          See All
        </button>
        {user && (
          <>
            <button
              type="button"
              onClick={() => handleFilterSubmit("fav")}
              className={
                user
                  ? "btn btn-light btn-filter-recipes"
                  : "btn btn-orange btn-filter-recipes"
              }
            >
              See Favorite
            </button>
            <Link to={PATHS.CREATE_RECIPE}>
              <button
                type="button"
                className="btn btn-light btn-filter-recipes"
              >
                Add new
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="recipes__cards">
        {isLoading && <h4>Loading...</h4>}
        {!isLoading &&
          listOfRecipes.map((eachRecipe) => {
            return (
              <div key={eachRecipe._id}>
                <RecipeCard eachRecipe={eachRecipe} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Recipes;

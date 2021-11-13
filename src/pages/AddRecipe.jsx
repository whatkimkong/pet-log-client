import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import LoadingComponent from "../components/Loading";
import { fileUpload } from "../services/fileUpload";
import * as PATHS from "../utils/paths";
import * as RECIPES_SERVICES from "../services/recipes";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";

const statusValues = [
  { value: "false", label: "Public" },
  { value: "true", label: "Private" },
];

function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    statusPrivate: false,
    tags: [],
    image: "",
    difficulty: "",
    totalTime: 0,
    prepTime: 0,
    ingredients: "",
    preparation: "",
  });
  const {
    title,
    statusPrivate,
    tags,
    image,
    difficulty,
    totalTime,
    prepTime,
    ingredients,
    preparation,
  } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const navigate = useNavigate();

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleImageUpload(event) {
    setImageIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);
    fileUpload(uploadData).then((res) => {
      setForm({ ...form, image: res.data.filePath });
      setImageIsUploading(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      title,
      statusPrivate,
      tags,
      image,
      difficulty,
      totalTime,
      prepTime,
      ingredients,
      preparation,
    };
    RECIPES_SERVICES.createRecipe(data)
      .then((res) => {
        navigate(PATHS.RECIPES);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }

  return (
    <div>
      <h3 className="add-recipe__title">Create and Share a New Recipe</h3>
      <form onSubmit={handleSubmit} className="add-recipe__form">
        <TextField
          type="text"
          name="title"
          value={title}
          label="Title"
          onChange={handleChange}
          className={classes.root}
          variant="outlined"
          fullWidth
          style={{
            marginBottom: "2vh",
          }}
        />
        <div>
          <TextField
            select
            name="statusPrivate"
            value={statusValues}
            onChange={handleChange}
            className={classes.root}
            fullWidth
            style={{
              marginBottom: "2vh",
            }}
          >
            {statusValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div class="mb-3">
          <select
            class="form-select"
            name="statusPrivate"
            onChange={handleChange}
          >
            <option selected value="false">
              Public
            </option>
            <option value="true">Private</option>
          </select>
        </div>
        <div class="mb-3">
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={tags}
            onChange={handleChange}
            className="form-control add-form"
          />
          <IconButton>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div class="mb-3">
          <select class="form-select" name="difficulty" onChange={handleChange}>
            <option selected value="Easy">
              Easy
            </option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div class="mb-3">
          <input
            type="number"
            name="totalTime"
            placeholder="Total Time"
            value={totalTime}
            onChange={handleChange}
            className="form-control add-form"
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            name="prepTime"
            placeholder="Preparation Time"
            value={prepTime}
            onChange={handleChange}
            className="form-control add-form"
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            name="ingredients"
            placeholder="Ingredients"
            value={ingredients}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            name="preparation"
            placeholder="Preparation"
            value={preparation}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="form-control add-form form-control-sm"
        />
        {error && (
          <div className="error-block">
            <p className="auth__error">
              <span>{error}</span>
            </p>
          </div>
        )}
        {imageIsUploading && <LoadingComponent />}
        <button
          className="button__submit btn-orange btn auth__submit-btn"
          type="submit"
          disabled={imageIsUploading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;

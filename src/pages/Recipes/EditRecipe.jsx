import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import * as RECIPES_SERVICES from "../../services/recipes";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const statusValues = [
  { value: "false", label: "Public" },
  { value: "true", label: "Private" },
];

const difficultyLevel = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

function AddRecipe({ user }) {
  const [form, setForm] = useState({
    title: "",
    statusPrivate: null,
    image: "",
    difficulty: "",
    time: "",
    ingredients: "",
    preparation: "",
  });

  const {
    title,
    statusPrivate,
    image,
    difficulty,
    time,
    ingredients,
    preparation,
  } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

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
      image,
      difficulty,
      time,
      ingredients,
      preparation,
    };
    RECIPES_SERVICES.editRecipe(params.recipeId, data)
      .then((res) => {
        navigate(`${PATHS.RECIPES}/${params.recipeId}`);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    console.log("mounting");
    RECIPES_SERVICES.getOne(params.recipeId)
      .then((res) => {
        setForm({
          ...form,
          title: res.data.title,
          statusPrivate: res.data.statusPrivate,
          image: res.data.image,
          difficulty: res.data.difficulty,
          time: res.data.time,
          ingredients: res.data.ingredients,
          preparation: res.data.preparation,
        });
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div>
      <h3 className="add-recipe__title">Edit your recipe</h3>
      <form onSubmit={handleSubmit} className="add-recipe__form">
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
          select
          name="statusPrivate"
          value={statusPrivate}
          onChange={handleChange}
          className={classes.root}
          fullWidth
          helperText="Select the status"
          style={{
            marginBottom: "2vh",
          }}
        >
          {statusValues.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: "0.9rem" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="difficulty"
          value={difficulty}
          onChange={handleChange}
          className={classes.root}
          fullWidth
          helperText="Select the difficulty level"
          style={{
            marginBottom: "2vh",
          }}
        >
          {difficultyLevel.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{ fontSize: "0.9rem" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="number"
          name="time"
          value={time}
          onChange={handleChange}
          className={classes.root}
          variant="outlined"
          fullWidth
          helperText="Total time"
          style={{
            marginBottom: "2vh",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <p style={{ color: "rgba(0, 0, 0, 0.6)", margin: "0" }}>min</p>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="text"
          name="ingredients"
          value={ingredients}
          helperText="List of ingredients"
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
        <TextField
          type="text"
          name="preparation"
          value={preparation}
          helperText="Preparation process"
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
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="form-control add-form form-control-sm"
        />
        <img
          src={image}
          alt={title}
          style={{ width: "50%", display: "block", margin: "2vh auto" }}
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
          className="button__submit btn-light btn add-recipe__submit-btn"
          type="submit"
          disabled={imageIsUploading}
          style={{ marginTop: imageIsUploading ? "0vh" : "2vh" }}
        >
          Submit
        </button>
      </form>
      <Link to={PATHS.RECIPES} className="link-back">
        <IconButton aria-label="Example">
          <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Link>
    </div>
  );
}

export default AddRecipe;

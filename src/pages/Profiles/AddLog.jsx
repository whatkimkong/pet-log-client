import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import * as LOGS_SERVICES from "../../services/logs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

const logCategory = [
  { value: "Vaccines", label: "Vaccines" },
  { value: "Health", label: "Health" },
  { value: "Food", label: "Food" },
];

function AddLog({ user }) {
  const [form, setForm] = useState({
    category: "",
    title: "",
    date: "",
    expirationDate: "",
    comment: "",
    image: "",
    foodBrand: "",
    foodFlavor: "",
    foodQuantity: "",
  });

  const {
    category,
    title,
    date,
    expirationDate,
    comment,
    image,
    foodBrand,
    foodFlavor,
    foodQuantity,
  } = form;

  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const navigate = useNavigate();
  const { petId } = useParams();

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
      category,
      title,
      date,
      expirationDate,
      comment,
      image,
      foodBrand,
      foodFlavor,
      foodQuantity,
      pet: petId,
      owner: user._id,
    };
    LOGS_SERVICES.addLog(data)
      .then((res) => {
        navigate(`${PATHS.LOGS}/${petId}`);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  return (
    <div className="public__container">
      <h3 className="add-pet__title">Create a new entry</h3>
      <form onSubmit={handleSubmit} className="add-recipe__form">
        <TextField
          select
          name="category"
          value={category}
          onChange={handleChange}
          className={classes.root}
          fullWidth
          helperText="Entry category *"
          style={{
            marginBottom: "2vh",
          }}
        >
          {logCategory.map((option) => (
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
          type="text"
          name="title"
          value={title}
          helperText="Title *"
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
          type="date"
          name="date"
          value={date}
          helperText="Date of the event"
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
        {category === "Vaccines" && (
          <TextField
            type="date"
            name="expirationDate"
            value={expirationDate}
            helperText="Vaccine's expiration date"
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
        )}
        <TextField
          type="text"
          name="comment"
          value={comment}
          helperText="Comment"
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
        {category === "Food" && (
          <>
            <TextField
              type="text"
              name="foodBrand"
              value={foodBrand}
              helperText="Food Brand"
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
              type="text"
              name="foodFlavor"
              value={foodFlavor}
              helperText="Food Flavour"
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
              name="foodQuantity"
              value={foodQuantity}
              onChange={handleChange}
              className={classes.root}
              variant="outlined"
              fullWidth
              helperText="Quantity of food bought/made"
              style={{
                marginBottom: "2vh",
              }}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <p style={{ color: "rgba(0, 0, 0, 0.6)", margin: "0" }}>
                      grams
                    </p>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
        <input
          type="file"
          name="profilePic"
          onChange={handleImageUpload}
          className="form-control add-form form-control-sm"
        />
        {imageIsUploading && <LoadingComponent />}
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
          disabled={imageIsUploading}
          style={{ marginTop: imageIsUploading ? "0vh" : "2vh" }}
        >
          Submit
        </button>
      </form>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(`${PATHS.LOGS}/${petId}`)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default AddLog;

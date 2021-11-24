import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import * as PETS_SERVICES from "../../services/pets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

const petType = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

function EditPet({ user }) {
  const [form, setForm] = useState({
    type: "",
    name: "",
    profilePic: "",
    birthday: "",
    breed: "",
    gender: "",
    weight: "",
    avgDailyFood: "",
    chipId: "",
  });

  const {
    type,
    name,
    profilePic,
    birthday,
    breed,
    gender,
    weight,
    avgDailyFood,
    chipId,
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
      setForm({ ...form, profilePic: res.data.filePath });
      setImageIsUploading(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      type,
      name,
      profilePic,
      birthday,
      breed,
      gender,
      weight,
      avgDailyFood,
      chipId,
    };

    PETS_SERVICES.editPet(params.id, data)
      .then((res) => {
        navigate(PATHS.PETS_PROFILE);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PETS_SERVICES.getOne(params.id)
      .then((res) => {
        setForm({
          ...form,
          type: res.data.type,
          name: res.data.name,
          profilePic: res.data.profilePic,
          birthday: res.data.birthday.slice(0, 10),
          breed: res.data.breed,
          gender: res.data.gender,
          weight: res.data.weight,
          avgDailyFood: res.data.avgDailyFood,
          chipId: res.data.chipId,
        });
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div>
      <div className="public__container">
        <h3 className="add-pet__title">Edit your pet's information</h3>
        <form onSubmit={handleSubmit} className="add-recipe__form">
          <h6 className="pets__section-title" style={{ marginTop: "0" }}>
            General data
          </h6>
          <TextField
            select
            name="type"
            value={type}
            onChange={handleChange}
            className={classes.root}
            fullWidth
            helperText="Type of pet"
            style={{
              marginBottom: "2vh",
            }}
          >
            {petType.map((option) => (
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
            name="name"
            value={name}
            helperText="Name"
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
            name="birthday"
            value={birthday}
            helperText="Birthday"
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
            name="breed"
            value={breed}
            helperText="Breed"
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
            name="gender"
            value={gender}
            onChange={handleChange}
            className={classes.root}
            fullWidth
            helperText="Gender"
            style={{
              marginBottom: "2vh",
            }}
          >
            {genderOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ fontSize: "0.9rem" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <input
            type="file"
            name="profilePic"
            onChange={handleImageUpload}
            className="form-control add-form form-control-sm"
          />
          {imageIsUploading && <LoadingComponent />}
          <h6 className="pets__section-title" style={{ marginTop: "7vh" }}>
            Health data
          </h6>
          <TextField
            type="number"
            name="weight"
            value={weight}
            onChange={handleChange}
            className={classes.root}
            variant="outlined"
            fullWidth
            helperText="Weight"
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
          <TextField
            type="number"
            name="avgDailyFood"
            value={avgDailyFood}
            onChange={handleChange}
            className={classes.root}
            variant="outlined"
            fullWidth
            helperText="Average daily food quantity"
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
          <h6 className="pets__section-title">Security data</h6>
          <TextField
            type="text"
            name="chipId"
            value={chipId}
            helperText="Chip Id"
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
              onClick={() => navigate(PATHS.PETS_PROFILE)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
}

export default EditPet;

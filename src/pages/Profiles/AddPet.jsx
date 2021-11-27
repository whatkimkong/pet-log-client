import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import * as PETS_SERVICES from "../../services/pets";
import * as EVENTS_SERVICES from "../../services/events";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const petType = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

function PetProfile({ user, setUser }) {
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
    entityL: "",
    documentIdL: "",
    expirationDateL: "",
    entityH: "",
    documentIdH: "",
    expirationDateH: "",
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
    entityL,
    documentIdL,
    expirationDateL,
    entityH,
    documentIdH,
    expirationDateH,
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
      setForm({ ...form, profilePic: res.data.filePath });
      setImageIsUploading(false);
    });
  }

  function handleBirthdays() {
    const dayjs = require("dayjs");
    const yearToday = dayjs().year();
    const monthToday = dayjs().month() + 1;
    const dayToday = dayjs().date();
    const monthBirthday = dayjs(birthday).month() + 1;
    const dayBirthday = dayjs(birthday).date();
    if (monthToday < monthBirthday) {
      return new Date(yearToday, monthBirthday - 1, dayBirthday);
    } else if ((monthToday = monthBirthday && dayToday <= dayBirthday)) {
      return new Date(yearToday, monthBirthday - 1, dayBirthday);
    } else {
      return new Date(yearToday + 1, monthBirthday - 1, dayBirthday);
    }
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
    PETS_SERVICES.addPet(data)
      .then((res) => {
        setUser(res.data.user);
        const eventData = {
          category: "Birthday",
          name: `${res.data.pet.name}'s birthday'`,
          pet: res.data.pet._id,
          owner: user._id,
          date: handleBirthdays(),
        };
        return EVENTS_SERVICES.addEvent(eventData);
      })
      .then((res) => {
        navigate(PATHS.PETS_PROFILE);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    toast.info("Fill out your pet's birthday so you get an alert every year", {
      position: "top-right",
      delay: 2000,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    toast.info(
      "Fill out its average daily food quantity, so that we can calculate when you'll be out of stock.",
      {
        position: "top-right",
        delay: 6000,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  return (
    <div className="public__container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h3 className="h3__title">Add a new pet to your family</h3>
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
          helperText="Type of pet *"
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
          helperText="Name *"
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
  );
}

export default PetProfile;

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import Chip from "@mui/material/Chip";
import * as PATHS from "../../utils/paths";
import PetsIcon from "@mui/icons-material/Pets";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as PETS_SERVICES from "../../services/pets";

const petsTest = ["pet 1", "pet 2", "pet 3"];

const petType = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

function PetProfile({ user, setUser }) {
  const [pet, setPet] = useState(0);
  const [form, setForm] = useState({
    type: "",
    name: null,
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
  const [isLoading, setIsLoading] = useState(true);
  const [showLiability, setShowLiability] = useState(true);
  const [showHealth, setShowHealth] = useState(true);
  const navigate = useNavigate();

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  function handleCarousel(direction) {
    if (direction === "front" && pet < petsTest.length - 1) {
      setPet(pet + 1);
    } else if (direction === "back" && pet > 0) {
      setPet(pet - 1);
    }
  }

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
    const generalData = {
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
    PETS_SERVICES.addPet(generalData)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => setError(err.response.data.errorMessage));
    /* const legalData = [
      {
        category: expirationDateL && "Liability Insurance",
        entity: entityL,
        documentId: documentIdL,
        expirationDate: expirationDateL,
      },
      {
        category: expirationDateH && "Health Insurance",
        entity: entityH,
        documentId: documentIdH,
        expirationDate: expirationDateH,
      },
    ]; */
  }

  return (
    <div className="public__container">
      {user.pets.length > 0 && (
        <div className="pets__carousel">
          <IconButton
            sx={{ color: "white" }}
            onClick={() => handleCarousel("back")}
            disabled={pet === 0 && true}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <div>{user.pets[pet].name}</div>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => handleCarousel("front")}
            disabled={pet === user.pets.length - 1 && true}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
      <Chip
        icon={<PetsIcon style={{ color: "white" }} />}
        label="Add a pet"
        sx={{ color: "white" }}
      />
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
      <div className="profile__insurance-container">
        <p className="profile__insurance-category">Add liability insurance</p>
        <IconButton sx={{ margin: "0" }}>
          {!showLiability && (
            <ArrowDropDownIcon
              fontSize="large"
              sx={{ display: "inline" }}
              onClick={() => setShowLiability(!showLiability)}
            />
          )}
          {showLiability && (
            <ArrowDropUpIcon
              fontSize="large"
              sx={{ display: "inline" }}
              onClick={() => setShowLiability(!showLiability)}
            />
          )}
        </IconButton>
      </div>
      <form className="add-recipe__form" hidden={showLiability}>
        <TextField
          type="text"
          name="entityL"
          value={entityL}
          helperText="Entity"
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
          name="documentIdL"
          value={documentIdL}
          helperText="Document Id"
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
          name="expirationDateL"
          value={expirationDateL}
          helperText="Expiration Date"
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
      <div className="profile__insurance-container">
        <p className="profile__insurance-category">Add health insurance</p>
        <IconButton sx={{ margin: "0" }}>
          {!showHealth && (
            <ArrowDropDownIcon
              fontSize="large"
              sx={{ display: "inline" }}
              onClick={() => setShowHealth(!showHealth)}
            />
          )}
          {showHealth && (
            <ArrowDropUpIcon
              fontSize="large"
              sx={{ display: "inline" }}
              onClick={() => setShowHealth(!showHealth)}
            />
          )}
        </IconButton>
      </div>
      <form className="add-recipe__form" hidden={showHealth}>
        <TextField
          type="text"
          name="entityH"
          value={entityH}
          helperText="Entity"
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
          name="documentIdH"
          value={documentIdH}
          helperText="Document Id"
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
          name="expirationDateH"
          value={expirationDateH}
          helperText="Expiration Date"
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
    </div>
  );
}

export default PetProfile;

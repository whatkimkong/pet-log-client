import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICES from "../../services/user";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

function UserProfile({ user, setUser }) {
  console.log(user);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
  });
  const { firstName, lastName, profilePic } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      profilePic,
    };
    USER_SERVICES.editUser(data)
      .then((res) => {
        setUser(res.data.user);
        navigate(PATHS.HOMEPAGE);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    USER_SERVICES.getUser()
      .then((res) => {
        setForm({
          ...form,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          profilePic: res.data.profilePic,
        });
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      <h3 className="profile__title">Edit your profile data</h3>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          <div className="profile__header">
            <div className="profile__profile-pic-container">
              <img
                src={user.profilePic}
                alt={user.firstName}
                className="profile__profile-pic"
              />
            </div>
            <p className="profile__name">
              {user.firstName} {user.lastName}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="add-recipe__form">
            <TextField
              type="text"
              name="firstName"
              value={firstName}
              helperText="Your first name"
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
              name="lastName"
              value={lastName}
              helperText="Your last name"
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
            <input
              type="file"
              name="profilePic"
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
              className="button__submit btn-light btn add-recipe__submit-btn"
              type="submit"
              disabled={imageIsUploading}
              style={{ marginTop: imageIsUploading ? "0vh" : "2vh" }}
            >
              Submit
            </button>
          </form>
        </>
      )}
      <Link to={PATHS.HOMEPAGE} className="link-back link-back-profile">
        <IconButton aria-label="Example">
          <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Link>
    </div>
  );
}

export default UserProfile;

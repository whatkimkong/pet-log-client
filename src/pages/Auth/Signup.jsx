import React, { useState } from "react";
import { signup } from "../../services/auth";
import { fileUpload } from "../../services/fileUpload";
import { useNavigate, Link } from "react-router-dom";
import { HOMEPAGE } from "../../utils/paths";
import LoadingComponent from "../../components/Loading";
import petPic1 from "../../images/pets1.jpeg";
import logo from "../../images/logo.png";
import * as CONSTS from "../../utils/consts";
import avatar from "../../images/avatar.png";

function Signup({ setUser }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const { firstName, lastName, email, password, profilePic } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleImageUpload(event) {
    setImageIsUploading(true);
    const uploadData = new FormData();
    console.log(event.target.files);
    uploadData.append("fileUrl", event.target.files[0]);
    fileUpload(uploadData).then((res) => {
      setForm({ ...form, profilePic: res.data.filePath });
      setImageIsUploading(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const credentials = {
      firstName,
      lastName,
      email,
      password,
      profilePic: profilePic || avatar,
    };
    signup(credentials)
      .then((res) => {
        setUser(res.data.user, true);
        navigate(HOMEPAGE);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(247, 99, 51, 0.4), rgba(247, 99, 51, 0.4)), url(${petPic1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      className="public__container"
    >
      <Link to={HOMEPAGE} className="auth__link">
        <img src={logo} alt={CONSTS.CAPITALIZED_APP} className="auth__logo" />
      </Link>
      <form onSubmit={handleSubmit} className="auth__form">
        <div class="mb-3">
          <input
            id="input-first-name"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
            className="form-control form-public"
          />
        </div>
        <div class="mb-3">
          <input
            id="input-last-name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange}
            className="form-control form-public"
          />
        </div>
        <div class="mb-3">
          <input
            id="input-email"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="form-control form-public"
          />
        </div>
        <div class="mb-3">
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="form-control form-public"
          />
        </div>
        <input
          id="input-profile-pic"
          type="file"
          name="profilePic"
          onChange={handleImageUpload}
          className="form-control form-public form-control-sm"
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

export default Signup;

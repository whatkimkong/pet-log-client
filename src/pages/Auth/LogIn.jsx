import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { HOMEPAGE, SIGNUPPAGE } from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import petPic1 from "../../images/pets1.jpeg";
import logo from "../../images/logo.png";

function LogIn({ setUser }) {
  const [form, setForm] = useState({
    email: "inesherminio@gmail.com",
    password: "MacZazu21",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };
    login(credentials)
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
      className="public__container login__container"
    >
      <div className="homepage__description">
        <h1 className="homepage__description__title">Pet Log</h1>
        <h3 className="homepage__description__slogan">your pet's diary</h3>
      </div>
      <form onSubmit={handleSubmit} className="auth__form">
        <div class="mb-3">
          <input
            id="input-email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="form-control form-public"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            className="form-control form-public"
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="error-block">
            <p className="auth__error">
              <span>{error}</span>
            </p>
          </div>
        )}
        <button
          className="button__submit btn-orange btn auth__submit-btn"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Link to={SIGNUPPAGE} className="login__signup-link">
        <p className="login__signup-redirect">Create account</p>
      </Link>
    </div>
  );
}

export default LogIn;

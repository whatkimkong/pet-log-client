import { Link } from "react-router-dom";
import "../App.css";
import petPic1 from "../images/pets1.jpeg";
import logo from "../images/logo.png";
import iconBone from "../images/icon-bone.jpg";
import iconVet from "../images/icon-vet.jpg";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

function HomePage() {
  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(247, 99, 51, 0.4), rgba(247, 99, 51, 0.4)), url(${petPic1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="public__container"
    >
      <Link to={PATHS.LOGINPAGE} className="homepage__link_login">
        {" "}
        <button type="button" className="btn btn-orange homepage__login-btn">
          Login
        </button>
      </Link>
      <img src={logo} alt={CONSTS.CAPITALIZED_APP} className="homepage__logo" />
      <div className="homepage__description">
        <h1 className="homepage__description__title">Pet Log</h1>
        <h3 className="homepage__description__slogan">your pet's diary</h3>
      </div>
      <Link to={PATHS.SIGNUPPAGE}>
        {" "}
        <button type="button" className="btn btn-light homepage__signup-btn">
          Sign Up
        </button>
      </Link>
      <div className="homepage__card">
        <Link to={PATHS.RECIPES}>Recipes</Link>
      </div>
      <div className="homepage__card">
        <Link to={PATHS.SERVICES}>Services</Link>
      </div>
    </div>
  );
}

export default HomePage;

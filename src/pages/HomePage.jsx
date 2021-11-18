import { Link } from "react-router-dom";
import "../App.css";
import petPic1 from "../images/pets1.jpeg";
import logo from "../images/logo.png";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CommentIcon from "@mui/icons-material/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

function HomePage({ user }) {
  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(247, 99, 51, 0.4), rgba(247, 99, 51, 0.4)), url(${petPic1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="public__container"
    >
      {!user && (
        <>
          <img
            src={logo}
            alt={CONSTS.CAPITALIZED_APP}
            className="homepage__logo"
          />
          <div className="homepage__description">
            <h1 className="homepage__description__title">Pet Log</h1>
            <h3 className="homepage__description__slogan">your pet's diary</h3>
          </div>
        </>
      )}
      {!user && (
        <>
          <Link to={PATHS.SIGNUPPAGE}>
            {" "}
            <button
              type="button"
              className="btn btn-light homepage__signup-btn"
            >
              Sign Up
            </button>
          </Link>
          <div className="homepage__card">
            <Link to={PATHS.RECIPES} className="homepage__link">
              <div className="homepage__icon-container">
                <FoodBankIcon sx={{ color: "#ed5d30" }} fontSize="large" />
              </div>
              <h6 className="homepage__card-description">
                Check out the best pet recipes available! Your pets will love
                it!
              </h6>
            </Link>
          </div>
          <div className="homepage__card">
            <Link to={PATHS.SERVICES} className="homepage__link">
              <div className="homepage__icon-container">
                <LocalHospitalIcon sx={{ color: "#ed5d30" }} fontSize="large" />
              </div>
              <h6 className="homepage__card-description">
                New to the zone? Check out all the pet services around you!
              </h6>
            </Link>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="homepage__notifications-card">
            <div className="homepage__notifications-title">
              <NotificationsIcon sx={{ color: "#ed5d30" }} />
              <h6>Happening next week</h6>
            </div>
          </div>
          <div className="homepage__dashboard-container">
            <div className="homepage__dashboard-card">
              <Link to={PATHS.RECIPES} className="homepage__dashboard-link">
                <FoodBankIcon sx={{ color: "white" }} fontSize="large" />
                <p>Recipes</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link to={PATHS.SERVICES} className="homepage__dashboard-link">
                <LocalHospitalIcon sx={{ color: "white" }} fontSize="large" />
                <p>Services</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link to={PATHS.LOGS} className="homepage__dashboard-link">
                <CommentIcon sx={{ color: "white" }} fontSize="large" />
                <p>Logs</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link to={PATHS.CALENDAR} className="homepage__dashboard-link">
                <CalendarTodayIcon sx={{ color: "white" }} fontSize="large" />
                <p>Calendar</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link to={PATHS.PHOTOS} className="homepage__dashboard-link">
                <InsertPhotoIcon sx={{ color: "white" }} fontSize="large" />
                <p>Photos</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link
                to={PATHS.USER_PROFILE}
                className="homepage__dashboard-link"
              >
                <AccountCircleIcon sx={{ color: "white" }} fontSize="large" />
                <p>Profile</p>
              </Link>
            </div>
            {user.pets.length > 0 &&
              user.pets.map((pet) => {
                return (
                  <div className="homepage__dashboard-card" key={pet._id}>
                    <Link
                      to={PATHS.PET_PROFILE}
                      className="homepage__dashboard-link"
                    >
                      <PetsIcon sx={{ color: "white" }} fontSize="large" />
                      <p>{pet.name}'s Profile</p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;

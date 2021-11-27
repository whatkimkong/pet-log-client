import { Link, Navigate } from "react-router-dom";
import "../App.css";
import petPic1 from "../images/pets1.jpeg";
import * as PATHS from "../utils/paths";
import * as EVENTS_SERVICES from "../services/events";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect, useState } from "react";
import LogCard from "../components/LogCard/LogCard";
import LoadingComponent from "../components/Loading";

function HomePage({ user }) {
  const [listOfEvents, setListOfEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    EVENTS_SERVICES.getEvents()
      .then((res) => {
        setListOfEvents(res.data.events);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(247, 99, 51, 0.4), rgba(247, 99, 51, 0.4)), url(${petPic1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "0 65%",
      }}
      className="public__container"
    >
      {!user && (
        <>
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
              <h6>Happening next</h6>
              <hr style={{ margin: "0" }} />
              {isLoading && <LoadingComponent />}
              {listOfEvents && listOfEvents.length > 0 && (
                <table
                  class="table table-borderless table-sm"
                  style={{ margin: "2vh 0 0 0", width: "100%" }}
                >
                  <tbody>
                    {listOfEvents.map((eachEvent) => {
                      return (
                        <LogCard eachLog={eachEvent} key={eachEvent._id} />
                      );
                    })}
                  </tbody>
                </table>
              )}
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
            {/*<div className="homepage__dashboard-card">
              <Link to={PATHS.LOGS} className="homepage__dashboard-link">
                <AssignmentIcon sx={{ color: "white" }} fontSize="large" />
                <p>Journal</p>
              </Link>
            </div>
             <div className="homepage__dashboard-card">
              <Link to={PATHS.CALENDAR} className="homepage__dashboard-link">
                <CalendarTodayIcon sx={{ color: "white" }} fontSize="large" />
                <p>Calendar</p>
              </Link>
            </div> */}
            <div className="homepage__dashboard-card">
              <Link to={PATHS.PHOTOS} className="homepage__dashboard-link">
                <InsertPhotoIcon sx={{ color: "white" }} fontSize="large" />
                <p>Photos</p>
              </Link>
            </div>
            <div className="homepage__dashboard-card">
              <Link
                to={PATHS.PETS_PROFILE}
                className="homepage__dashboard-link"
              >
                <PetsIcon sx={{ color: "white" }} fontSize="large" />
                <p>Pets</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;

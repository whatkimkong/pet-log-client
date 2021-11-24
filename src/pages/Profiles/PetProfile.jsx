import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import Chip from "@mui/material/Chip";
import * as PATHS from "../../utils/paths";
import PetsIcon from "@mui/icons-material/Pets";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import * as PETS_SERVICES from "../../services/pets";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Paper from "@mui/material/Paper";

function PetProfile({ user, setUser }) {
  const [pets, setPets] = useState(null);
  const [showLiability, setShowLiability] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [pet, setPet] = useState(0);
  const [form, setForm] = useState({
    entity: "",
    documentId: "",
    expirationDate: "",
  });

  const { entity, documentId, expirationDate } = form;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleCarousel(direction) {
    if (direction === "front" && pet < pets.length - 1) {
      setPet(pet + 1);
    } else if (direction === "back" && pet > 0) {
      setPet(pet - 1);
    }
  }

  function handleShows(component) {
    if (component === "liability") {
      setShowHealth(false);
      setShowLog(false);
      setShowLiability(true);
    } else if (component === "health") {
      setShowHealth(true);
      setShowLog(false);
      setShowLiability(false);
    } else if (component === "log") {
      setShowHealth(false);
      setShowLog(true);
      setShowLiability(false);
    }
  }

  function handleDelete(id) {
    PETS_SERVICES.removePet(id)
      .then((res) => {
        setPet(0);
        setUser(res.data.user);
        setPets(res.data.user.pets);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.errorMessage);
      });
  }

  function handleSubmit(event, category) {
    event.preventDefault();
    const data = {
      category: category,
      entity,
      documentId,
      expirationDate,
      pet: pets[pet]._id,
    };

    PETS_SERVICES.addLegalData(data)
      .then((res) => {
        setForm({ entity: "", documentId: "", expirationDate: "" });
        setShowLiability(false);
        setShowHealth(false);
        setShowLog(false);
        navigate(PATHS.PETS_PROFILE);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PETS_SERVICES.getPets()
      .then((res) => {
        setPets(res.data.pets);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      <Link to={PATHS.ADD_PET} className="add-pet-link">
        <Chip
          icon={<PetsIcon style={{ color: "white" }} />}
          label="Add a pet"
          sx={{ color: "white" }}
        />
      </Link>
      {isLoading && <LoadingComponent />}
      {pets && pets.length === 0 && (
        <h3 className="pet-profile__title">Add your first pet!</h3>
      )}
      {pets && pets.length > 0 && (
        <>
          <h3 className="pet-profile__title">Your pets</h3>
          <div className="pets__carousel">
            <IconButton
              sx={{ color: "white" }}
              onClick={() => handleCarousel("back")}
              disabled={pet === 0 && true}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <div className="profile__pet-profile-pic-container">
              {pets[pet].profilePic && (
                <img
                  src={pets[pet].profilePic}
                  alt={pets[pet].name}
                  className="profile__pet-profile-pic"
                />
              )}
            </div>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => handleCarousel("front")}
              disabled={pet === pets.length - 1 && true}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
          <div className="pet-info-container">
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Name</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].name}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Type</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].type}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Birthday</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {new Date(pets[pet].birthday).toDateString()}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Breed</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].breed}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Gender</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].gender}
              </p>
            </div>
            <div className="pet-info-subcontainer" style={{ marginTop: "3vh" }}>
              <h6 className="pet-subcontainer-title">Weight</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {Math.round((pets[pet].weight / 1000) * 100) / 100} kg
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Avg daily food</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].avgDailyFood} g
              </p>
            </div>
            <div className="pet-info-subcontainer" style={{ marginTop: "3vh" }}>
              <h6 className="pet-subcontainer-title">Chip Id</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: user
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)",
                }}
              >
                {pets[pet].chipId}
              </p>
            </div>
            {/* {pets[pet].legalData.length > 0 &&
              pets[pet].legalData.map((eachData) => {
                <div>
                  <div
                    className="pet-info-subcontainer"
                    style={{ marginTop: "3vh" }}
                  >
                    <h6 className="pet-subcontainer-title">Category</h6>
                    <p
                      className="pet-subcontainer-description"
                      style={{
                        color: user
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {eachData.category}
                    </p>
                  </div>
                  <div className="pet-info-subcontainer">
                    <h6 className="pet-subcontainer-title">Entity</h6>
                    <p
                      className="pet-subcontainer-description"
                      style={{
                        color: user
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {eachData.entity}
                    </p>
                  </div>
                  <div className="pet-info-subcontainer">
                    <h6 className="pet-subcontainer-title">Document Id</h6>
                    <p
                      className="pet-subcontainer-description"
                      style={{
                        color: user
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {eachData.documentId}
                    </p>
                  </div>
                  <div className="pet-info-subcontainer">
                    <h6 className="pet-subcontainer-title">Expiration Date</h6>
                    <p
                      className="pet-subcontainer-description"
                      style={{
                        color: user
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {new Date(eachData.expirationDate).toDateString()}
                    </p>
                  </div>
                </div>;
              })} */}
          </div>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="Edit"
                icon={<EditIcon />}
                onClick={() =>
                  navigate(`${PATHS.PETS_PROFILE}${pets[pet]._id}`)
                }
              />
              <BottomNavigationAction
                label={`${pets[pet].name}'s Journal`}
                icon={<AssignmentIcon />}
                onClick={() => navigate(`${PATHS.LOGS}/${pets[pet]._id}`)}
              />
              <BottomNavigationAction
                label="Delete"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(pets[pet]._id)}
              />
            </BottomNavigation>
          </Paper>
          {/* <BasicMenu
            style={{ alignSelf: "flex-end" }}
            handleShows={handleShows}
          /> 
          <div>
            {(showLiability || showHealth) && (
              <form
                onSubmit={(event) =>
                  handleSubmit(
                    event,
                    showLiability ? "Liability Insurance" : "Health Insurance"
                  )
                }
                className="add-pet-info__form"
                style={{ marginTop: "0" }}
              >
                <h3 className="form__title">
                  {showLiability && "Add liability insurance data for you pet"}
                  {showHealth && "Add health insurance data for you pet"}
                </h3>
                <TextField
                  name="entity"
                  value={entity}
                  onChange={handleChange}
                  className={classes.root}
                  fullWidth
                  helperText="Insurer entity"
                  style={{
                    marginBottom: "2vh",
                  }}
                />
                <TextField
                  name="documentId"
                  value={documentId}
                  onChange={handleChange}
                  className={classes.root}
                  fullWidth
                  helperText="Document Id"
                  style={{
                    marginBottom: "2vh",
                  }}
                />
                <TextField
                  type="date"
                  name="expirationDate"
                  value={expirationDate}
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
                <button
                  className="button__submit btn-light btn add-recipe__submit-btn"
                  type="submit"
                  style={{ marginTop: "2vh" }}
                >
                  Submit
                </button>
              </form>
            )} 
          </div>*/}
        </>
      )}
    </div>
  );
}

export default PetProfile;

import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { fileUpload } from "../../services/fileUpload";
import * as PATHS from "../../utils/paths";
import * as PET_SERVICES_SERVICES from "../../services/petServices";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import LoadingComponent from "../../components/Loading";
import MenuItem from "@mui/material/MenuItem";
import * as L from "leaflet";
import parkIcon from "../../images/park-icon.png";
import vetIcon from "../../images/vet-icon.png";
import bathIcon from "../../images/bath-icon.png";
import petShopIcon from "../../images/shop-icon.png";
import trainerIcon from "../../images/trainer-icon.png";
import dayCareIcon from "../../images/daycare-icon.png";
import { Rating } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serviceTypes = [
  { value: "Dog Parks", label: "Dog Parks" },
  { value: "Vets", label: "Vets" },
  { value: "Pet Shops", label: "Pet Shops" },
  { value: "Bath&Grooming", label: "Bath&Grooming" },
  { value: "Trainers", label: "Trainers" },
  { value: "Day Care", label: "Day Care" },
];

function PetServices({ user }) {
  const [listOfServices, setListOfServices] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState(null);
  const [selection, setSelection] = useState(null);
  const [form, setForm] = useState({
    category: "",
    name: "",
    image: "",
    description: "",
    schedule: "",
    title: "",
    score: "",
    comment: "",
  });
  const [showExtraContainer, setShowExtraContainer] = useState(null);
  const {
    category,
    name,
    image,
    description,
    schedule,
    title,
    score,
    comment,
  } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [detailed, setDetailed] = useState(null);
  const [show, setShow] = useState(true);

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  const LeafIcon = L.Icon.extend({
    options: { iconSize: [30, 30] },
  });
  const park = new LeafIcon({
      iconUrl: parkIcon,
    }),
    vet = new LeafIcon({
      iconUrl: vetIcon,
    }),
    petShop = new LeafIcon({
      iconUrl: petShopIcon,
    }),
    bath = new LeafIcon({
      iconUrl: bathIcon,
    }),
    trainer = new LeafIcon({
      iconUrl: trainerIcon,
    }),
    dayCare = new LeafIcon({
      iconUrl: dayCareIcon,
    });

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleImageUpload(event) {
    setImageIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);
    fileUpload(uploadData).then((res) => {
      setForm({ ...form, image: res.data.filePath });
      setImageIsUploading(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      category,
      name,
      image,
      description,
      schedule,
      location: selection,
      creator: user._id,
    };
    PET_SERVICES_SERVICES.createService(data)
      .then((res) => {
        setShowExtraContainer(null);
        setSelection(null);
        return PET_SERVICES_SERVICES.getAll();
      })
      .then((res) => {
        setListOfServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleReviewSubmit(event) {
    event.preventDefault();
    const data = {
      title,
      score,
      comment,
      creator: user._id,
    };
    PET_SERVICES_SERVICES.createReview(detailed._id, data)
      .then((res) => {
        setDetailed(res.data.service);
        setForm({ title: "", score: "", comment: "" });
        setShow(true);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleDetails(serviceToDetail) {
    setDetailed(serviceToDetail);
    setShowExtraContainer("details");
  }

  function handleDelete(serviceId) {
    PET_SERVICES_SERVICES.deleteService(serviceId)
      .then((res) => {
        return PET_SERVICES_SERVICES.getAll(filterCategory);
      })
      .then((res) => {
        setListOfServices(res.data);
        setIsLoading(false);
        setDetailed(null);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    toast.info(
      "Allow for location tracking so that we can show you pet services near you.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  useEffect(() => {
    PET_SERVICES_SERVICES.getAll(filterCategory)
      .then((res) => {
        setListOfServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, [filterCategory]);

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
      <h3
        className="h3__title"
        style={{
          color: user ? "white" : "black",
          width: "80%",
        }}
      >
        Find pet services near you
      </h3>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          <div className="services__filter-container">
            <button
              type="button"
              onClick={() => setFilter("")}
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("Dog Parks")}
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
            >
              Dog Parks
            </button>
            <button
              type="button"
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
              onClick={() => setFilter("Vets")}
            >
              Vets
            </button>
            <button
              type="button"
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
              onClick={() => setFilter("Pet Shops")}
            >
              Pet Shops
            </button>
            <button
              type="button"
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
              onClick={() => setFilter("Bath&Grooming")}
            >
              Bath&Grooming
            </button>
            <button
              type="button"
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
              onClick={() => setFilter("Trainers")}
            >
              Trainers
            </button>
            <button
              type="button"
              className={
                user
                  ? "btn btn-light btn-filter-services"
                  : "btn btn-orange btn-filter-services"
              }
              onClick={() => setFilter("Day Care")}
            >
              Day Care
            </button>
          </div>
          <MapContainer
            center={[38.736946, -9.142685]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "50vh", width: "95%", margin: "0 auto" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              id="mapbox/streets-v8"
              accessToken="pk.eyJ1IjoiaW5lc2hlcm1pbmlvIiwiYSI6ImNrdDVtbnp4cTBhNG4ycXBoN2l0ODZvZWgifQ.lrERrR4E7eoj1Z-c2mULhQ"
            />
            <LocationMarker
              setShowExtraContainer={setShowExtraContainer}
              setForm={setForm}
              selection={selection}
              setSelection={setSelection}
              position={position}
              setPosition={setPosition}
              user={user}
            />
            {filter &&
              listOfServices
                .filter((eachService) => {
                  return eachService.category === filter;
                })
                .map((eachService) => {
                  return (
                    <Marker
                      key={eachService._id}
                      position={eachService.location.coordinates}
                      icon={
                        eachService.category === "Pet Shops"
                          ? petShop
                          : eachService.category === "Dog Parks"
                          ? park
                          : eachService.category === "Vets"
                          ? vet
                          : eachService.category === "Bath&Grooming"
                          ? bath
                          : eachService.category === "Trainers"
                          ? trainer
                          : dayCare
                      }
                    >
                      <Popup style={{ zIndex: "1000" }}>
                        <p className="popup__name">{eachService.name}</p>
                        <button
                          className="popup__link"
                          onClick={() => handleDetails(eachService)}
                        >
                          See details
                        </button>
                      </Popup>
                    </Marker>
                  );
                })}
            {!filter &&
              listOfServices.map((eachService) => {
                return (
                  <Marker
                    key={eachService._id}
                    position={eachService.location.coordinates}
                    icon={
                      eachService.category === "Pet Shops"
                        ? petShop
                        : eachService.category === "Dog Parks"
                        ? park
                        : eachService.category === "Vets"
                        ? vet
                        : eachService.category === "Bath&Grooming"
                        ? bath
                        : eachService.category === "Trainers"
                        ? trainer
                        : dayCare
                    }
                  >
                    <Popup style={{ zIndex: "1000" }}>
                      <p className="popup__name">{eachService.name}</p>
                      <button
                        className="popup__link"
                        onClick={() => handleDetails(eachService)}
                      >
                        See details
                      </button>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
          <p className="pet-services__tip-to-add">
            Click on any location to add a new service
          </p>
          {user && showExtraContainer === "form" && (
            <form onSubmit={handleSubmit} className="add-recipe__form">
              <h3
                className="services__title"
                style={{
                  color: user ? "white" : "black",
                  width: "80%",
                  margin: "0 auto 2vh",
                }}
              >
                Add a service
              </h3>
              <TextField
                select
                name="category"
                value={category}
                onChange={handleChange}
                className={classes.root}
                fullWidth
                helperText="Select the service category"
                style={{
                  marginBottom: "2vh",
                }}
              >
                {serviceTypes.map((option) => (
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
                type="text"
                name="description"
                value={description}
                helperText="Describe the service"
                onChange={handleChange}
                className={classes.root}
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                style={{
                  marginBottom: "2vh",
                }}
                InputLabelProps={{
                  style: { color: "rgba(0, 0, 0, 0.6)" },
                }}
              />
              <TextField
                type="text"
                name="schedule"
                value={schedule}
                helperText="Opening schedule"
                onChange={handleChange}
                className={classes.root}
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                style={{
                  marginBottom: "2vh",
                }}
                InputLabelProps={{
                  style: { color: "rgba(0, 0, 0, 0.6)" },
                }}
              />
              <input
                type="file"
                name="image"
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
          )}
          {detailed && showExtraContainer === "details" && (
            <>
              <div className="recipe-details__container">
                <h3
                  className="h3__title"
                  style={{
                    color: user ? "white" : "black",
                    marginBottom: "2vh",
                  }}
                >
                  {detailed.name}
                </h3>
                {detailed.image && (
                  <img
                    src={detailed.image}
                    alt={detailed.name}
                    className="recipe-details__img"
                  />
                )}
                <div className="recipe-details__card-rating">
                  <Rating
                    className={user ? classes.rootPrivate : classes.rootPublic}
                    id="rating-private"
                    value={detailed.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <span
                    className="card-text card-reviews"
                    style={{
                      color: user
                        ? "rgba(255, 255, 255, 0.6)"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {detailed.reviews.length}
                  </span>
                </div>
                <div
                  className="recipe-details__ingredient recipe-details__subcontainer"
                  style={{ color: user ? "white" : "black" }}
                >
                  <h5 className="subcontainer-title">Description:</h5>
                  <p
                    className="subcontainer-description"
                    style={{
                      color: user
                        ? "rgba(255, 255, 255, 0.6)"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {detailed.description}
                  </p>
                </div>
                <div
                  className="recipe-details__preparation recipe-details__subcontainer"
                  style={{ color: user ? "white" : "black" }}
                >
                  <h5 className="subcontainer-title">Schedule:</h5>
                  <p
                    className="subcontainer-description"
                    style={{
                      color: user
                        ? "rgba(255, 255, 255, 0.6)"
                        : "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    {detailed.schedule}
                  </p>
                </div>
                {user && user.email === detailed.creator.email && (
                  <div style={{ marginTop: "5px" }}>
                    <button
                      type="button"
                      className="btn btn-light btn-filter-services"
                      onClick={() =>
                        navigate(`${PATHS.SERVICES}/${detailed._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-filter-services"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                      onClick={() => handleDelete(detailed._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <hr style={{ color: user ? "white" : "#f76333" }} />
              <h5 style={{ color: user ? "white" : "black", marginTop: "5vh" }}>
                Reviews
              </h5>
              {user && (
                <div className="add-review-container">
                  <button
                    className="button__submit btn-light btn add-review__btn"
                    type="button"
                    onClick={() => setShow(!show)}
                  >
                    Add a review
                  </button>
                  <form
                    onSubmit={handleReviewSubmit}
                    className="add-recipe__form"
                    hidden={show}
                  >
                    <TextField
                      type="text"
                      name="title"
                      value={title}
                      helperText="Define the title"
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
                      type="number"
                      name="score"
                      value={score}
                      onChange={handleChange}
                      className={classes.root}
                      variant="outlined"
                      fullWidth
                      helperText="Score"
                      style={{
                        marginBottom: "2vh",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <p
                              style={{
                                color: "rgba(0, 0, 0, 0.6)",
                                margin: "0",
                              }}
                            >
                              min 1 max 5
                            </p>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      type="text"
                      name="comment"
                      value={comment}
                      helperText="Comment"
                      onChange={handleChange}
                      className={classes.root}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={5}
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
                      style={{ marginTop: "2vh" }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
              <div className="reviews-container" style={{ width: "90%" }}>
                <ul className="list-group list-group-flush">
                  {detailed &&
                    detailed.reviews.length > 0 &&
                    detailed.reviews.map((review) => {
                      return (
                        <li key={review._id} className="list-group-item">
                          <div className="reviews__creator-container">
                            <img
                              src={review.creator.profilePic}
                              alt={review.creator.firstName}
                              className="reviews__profile-pic"
                            />
                            <span>
                              {!review.creator.firstName &&
                                `${user.firstName} ${user.lastName}`}
                              {review.creator.firstName}{" "}
                              {review.creator.lastName}
                            </span>
                          </div>
                          <div className="reviews__score-container">
                            <Rating
                              value={review.score}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <span className="reviews__date">
                              {new Date(review.createdAt).toDateString()}
                            </span>
                          </div>
                          <p className="reviews__comment">{review.comment}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PetServices;

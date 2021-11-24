import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
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
  });
  const [showForm, setShowForm] = useState(true);
  const { category, name, image, description, schedule } = form;
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
        setShowForm(true);
        return PET_SERVICES_SERVICES.getAll();
      })
      .then((res) => {
        setListOfServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PET_SERVICES_SERVICES.getAll(filterCategory)
      .then((res) => {
        setListOfServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, [filterCategory]);

  return (
    <div>
      <h3
        className="services__title"
        style={{
          color: user ? "white" : "black",
          width: "80%",
          paddingTop: "13vh",
          margin: "0 auto 5vh",
        }}
      >
        Check out all pet services near you
      </h3>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          {/* <TextField
            select
            name="filterCategory"
            value={filterCategory}
            onChange={handleChange}
            className={classes.root}
            fullWidth
            helperText="Filter by service category"
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
          </TextField> */}
          <MapContainer
            center={[38.736946, -9.142685]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "40vh", width: "95%", margin: "0 auto" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              id="mapbox/streets-v8"
              accessToken="pk.eyJ1IjoiaW5lc2hlcm1pbmlvIiwiYSI6ImNrdDVtbnp4cTBhNG4ycXBoN2l0ODZvZWgifQ.lrERrR4E7eoj1Z-c2mULhQ"
            />
            <LocationMarker
              setShowForm={setShowForm}
              setForm={setForm}
              selection={selection}
              setSelection={setSelection}
              position={position}
              setPosition={setPosition}
            />
            {listOfServices.map(({ location: { coordinates }, name, _id }) => {
              return (
                <Marker
                  key={_id}
                  position={coordinates}
                  onClick={() => console.log("clicked a marker")}
                >
                  <Popup style={{ zIndex: "1000" }}>
                    This is an event <br />
                    name: {name}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <p className="pet-services__tip-to-add">
            Click on any location to add a new service
          </p>
          <form
            hidden={showForm}
            onSubmit={handleSubmit}
            className="add-recipe__form"
          >
            <h3
              className="services__title"
              style={{
                color: user ? "white" : "black",
                width: "80%",
                margin: "0 auto 5vh",
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
        </>
      )}
    </div>
  );
}

export default PetServices;

import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link, useNavigate } from "react-router-dom";
import * as PET_SERVICES_SERVICES from "../../services/petServices";
import * as PATHS from "../../utils/paths";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

const serviceTypes = [
  { value: "Dog Parks", label: "Dog Parks" },
  { value: "Vets", label: "Vets" },
  { value: "Pet Shops", label: "Pet Shops" },
  { value: "Bath&Grooming", label: "Bath&Grooming" },
  { value: "Trainers", label: "Trainers" },
  { value: "Day Care", label: "Day Care" },
];

function EditService({ user }) {
  const [form, setForm] = useState({
    category: "",
    name: "",
    image: "",
    description: "",
    schedule: "",
  });
  const { category, name, image, description, schedule } = form;
  const [error, setError] = useState(null);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { serviceId } = useParams();

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
    };
    PET_SERVICES_SERVICES.editService(serviceId, data)
      .then((res) => {
        navigate(`${PATHS.SERVICES}`);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PET_SERVICES_SERVICES.getOne(serviceId)
      .then((res) => {
        setForm({
          ...form,
          category: res.data.category,
          name: res.data.name,
          image: res.data.image,
          description: res.data.description,
          schedule: res.data.schedule,
        });
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div>
      <h3 className="h3__title">Edit your service</h3>
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <form
          onSubmit={handleSubmit}
          className="add-recipe__form"
          style={{ paddingBottom: "10vh" }}
        >
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
          {image && (
            <img
              src={image}
              alt={name}
              style={{ width: "50%", display: "block", margin: "2vh auto" }}
            />
          )}
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

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(`${PATHS.SERVICES}`)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default EditService;

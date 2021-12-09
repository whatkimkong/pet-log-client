import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import * as PATHS from "../../utils/paths";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { stylesData } from "../../utils/muiStyles.jsx";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import * as LOGS_SERVICES from "../../services/logs";
import * as EVENTS_SERVICES from "../../services/events";
import * as PETS_SERVICES from "../../services/pets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

const logCategory = [
  { value: "Vaccines", label: "Vaccines" },
  { value: "Health", label: "Health" },
  { value: "Food", label: "Food" },
];

function AddLog({ user }) {
  const [form, setForm] = useState({
    category: "",
    title: "",
    date: "",
    expirationDate: "",
    comment: "",
    foodBrand: "",
    foodFlavor: "",
    foodQuantity: "",
  });
  const {
    category,
    title,
    date,
    expirationDate,
    comment,
    foodBrand,
    foodFlavor,
    foodQuantity,
  } = form;
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { petId } = useParams();

  const useStyles = makeStyles(stylesData[1]);
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFoodQuantityCount(totalQtt, date) {
    const avgQtt = pet.avgDailyFood;
    const numOfDays = Math.floor(totalQtt / avgQtt);
    return dayjs(date).add(numOfDays, "day").toString();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      category,
      title,
      date,
      expirationDate,
      comment,
      foodBrand,
      foodFlavor,
      foodQuantity,
      pet: petId,
      owner: user._id,
    };

    const eventData = {
      category,
      name: category === "Food" ? "Food stock alert" : title,
      pet: petId,
      owner: user._id,
      date: expirationDate || handleFoodQuantityCount(foodQuantity, date),
    };
    {
      (category === "Vaccines" || (category === "Food" && pet.avgDailyFood)) &&
        EVENTS_SERVICES.addEvent(eventData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => setError(err.response.data.errorMessage));
    }
    LOGS_SERVICES.addLog(data)
      .then((res) => {
        navigate(`${PATHS.LOGS}/${petId}`);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PETS_SERVICES.getOne(petId)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      <h3 className="h3__title">Create a new entry</h3>
      <form onSubmit={handleSubmit} className="add-recipe__form">
        <TextField
          select
          name="category"
          value={category}
          onChange={handleChange}
          className={classes.root}
          fullWidth
          helperText="Entry category *"
          style={{
            marginBottom: "2vh",
          }}
        >
          {logCategory.map((option) => (
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
          name="title"
          value={title}
          helperText="Title *"
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
          type="date"
          name="date"
          value={date}
          helperText="Date of the event"
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
        {category === "Vaccines" && (
          <TextField
            type="date"
            name="expirationDate"
            value={expirationDate}
            helperText="Vaccine's expiration date"
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
        )}
        <TextField
          type="text"
          name="comment"
          value={comment}
          helperText="Comment"
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
        {category === "Food" && (
          <>
            <TextField
              type="text"
              name="foodBrand"
              value={foodBrand}
              helperText="Food Brand"
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
              name="foodFlavor"
              value={foodFlavor}
              helperText="Food Flavour"
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
              name="foodQuantity"
              value={foodQuantity}
              onChange={handleChange}
              className={classes.root}
              variant="outlined"
              fullWidth
              helperText="Quantity of food bought/made"
              style={{
                marginBottom: "2vh",
              }}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <p style={{ color: "rgba(0, 0, 0, 0.6)", margin: "0" }}>
                      grams
                    </p>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
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
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(`${PATHS.LOGS}/${petId}`)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default AddLog;

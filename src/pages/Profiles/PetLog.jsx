import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as PET_SERVICES from "../../services/pets";
import LoadingComponent from "../../components/Loading";
import LogCard from "../../components/LogCard/LogCard";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import AssignmentIcon from "@mui/icons-material/Assignment";

function PetLog({ user }) {
  const [listOfLogs, setListOfLogs] = useState(null);
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const { petId } = useParams();

  useEffect(() => {
    PET_SERVICES.getOne(petId)
      .then((res) => {
        setPet(res.data);
        setListOfLogs(res.data.logs);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      {isLoading && <LoadingComponent />}
      {listOfLogs && listOfLogs.length === 0 && (
        <h3 className="pet-profile__title">Add {pet.name}'s first log!</h3>
      )}
      {listOfLogs && listOfLogs.length > 0 && (
        <>
          <div className="profile__pet-profile-pic-container">
            {pet.profilePic && (
              <img
                src={pet.profilePic}
                alt={pet.name}
                className="profile__pet-profile-pic"
              />
            )}
          </div>
          <h3 className="pet-profile__title">{pet.name}'s logs</h3>
          <div className="recipes__btn-filter-container">
            <button
              type="button"
              onClick={() => setFilter("")}
              className="btn btn-light btn-filter-recipes"
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("Vaccines")}
              className="btn btn-light btn-filter-recipes"
            >
              Vaccines
            </button>
            <button
              type="button"
              className="btn btn-light btn-filter-recipes"
              onClick={() => setFilter("Health")}
            >
              Health
            </button>
            <button
              type="button"
              className="btn btn-light btn-filter-recipes"
              onClick={() => setFilter("Food")}
            >
              Food
            </button>
          </div>
          <p
            className="pet-services__tip-to-add"
            style={{ marginTop: "4vh", width: "90%" }}
          >
            Click on any log to see details
          </p>
          <table
            class="table table-borderless table-sm"
            style={{ marginTop: "0" }}
          >
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filter &&
                listOfLogs
                  .filter((eachLog) => {
                    return eachLog.category === filter;
                  })
                  .map((eachLog) => {
                    return <LogCard eachLog={eachLog} key={eachLog._id} />;
                  })}
              {!filter &&
                listOfLogs.map((eachLog) => {
                  return <LogCard eachLog={eachLog} key={eachLog._id} />;
                })}
            </tbody>
          </table>
        </>
      )}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(`${PATHS.PETS_PROFILE}`)}
          />
          <BottomNavigationAction
            label="New entry"
            icon={<AssignmentIcon />}
            onClick={() => navigate(`${PATHS.LOGS}/${petId}/add`)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default PetLog;

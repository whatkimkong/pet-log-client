import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Chip from "@mui/material/Chip";
import { Link, useParams, Navigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import AddLog from "./AddLog";
import * as LOGS_SERVICES from "../../services/logs";
import LoadingComponent from "../../components/Loading";
import LogCard from "../../components/LogCard/LogCard";

function PetLog({ user }) {
  const [listOfLogs, setListOfLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { petId } = useParams();

  useEffect(() => {
    LOGS_SERVICES.getAllByPet(petId)
      .then((res) => {
        setListOfLogs(res.data.logs);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      <div className="pet-log__header">
        <Link
          to={`${PATHS.LOGS}/${petId}/add`}
          element={<AddLog />}
          className="add-pet-link"
        >
          <Chip
            icon={<CreateIcon style={{ color: "white" }} />}
            label="New entry"
            sx={{ color: "white" }}
          />
        </Link>
        {isLoading && <LoadingComponent />}
        {!isLoading &&
          listOfLogs.map((eachLog) => {
            return <LogCard eachLog={eachLog} key={eachLog._id} />;
          })}
      </div>
    </div>
  );
}

export default PetLog;

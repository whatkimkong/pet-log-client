import React, { useState } from "react";
import "./LogCard.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import * as PATHS from "../../utils/paths";

function LogCard({
  eachLog: {
    category,
    title,
    name,
    pet,
    date,
    expirationDate,
    _id,
    comment,
    foodBrand,
    foodFlavor,
    foodQuantity,
  },
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [white, setWhite] = useState(false);
  const navigate = useNavigate();

  function handleExpand() {
    setShowDetails(!showDetails);
    setWhite(!white);
  }

  return (
    <>
      <tr
        onClick={!name && handleExpand}
        className="main-table-item"
        style={{ backgroundColor: white && "white" }}
      >
        <td>{category}</td>
        <td>{title || name}</td>
        <td>{date.slice(0, 10)}</td>
        {!name && (
          <td>
            <IconButton
              sx={{ padding: "0" }}
              onClick={() => navigate(`${PATHS.LOGS}/${pet}/${_id}/edit`)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </td>
        )}
      </tr>
      <tr>
        <td colspan="4">
          {showDetails && (
            <table class="table mb-0 sub-table table-borderless table-sm">
              <thead>
                {category === "Food" && (
                  <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Flavor</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Comment</th>
                  </tr>
                )}
                {category === "Vaccines" && (
                  <tr>
                    <th scope="col">Expiration</th>
                    <th scope="col">Comment</th>
                  </tr>
                )}
                {category === "Health" && (
                  <tr>
                    <th scope="col">Comment</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {category === "Food" && (
                  <tr>
                    <td scope="col">{foodBrand}</td>
                    <td scope="col">{foodFlavor}</td>
                    <td scope="col">{foodQuantity} g</td>
                    <td scope="col">{comment}</td>
                  </tr>
                )}
                {category === "Vaccines" && (
                  <tr>
                    <td scope="col">{expirationDate.slice(0, 10)}</td>
                    <td scope="col">{comment}</td>
                  </tr>
                )}
                {category === "Health" && (
                  <tr>
                    <td scope="col">{comment}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </td>
      </tr>
    </>
  );
}

export default LogCard;

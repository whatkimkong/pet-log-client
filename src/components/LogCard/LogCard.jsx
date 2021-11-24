import React, { useState } from "react";
import "./LogCard.css";

function LogCard({
  eachLog: {
    category,
    title,
    pet: { name },
    date,
    expirationDate,
    _id,
    comment,
    foodBrand,
    foodFlavor,
    foodQuantity,
  },
}) {
  const { showDetail, setShowDetail } = useState(true);

  function handleShow() {
    return setShowDetail(!showDetail);
  }

  return (
    <li>
      <div>
        <div>{category}</div>
        <div>{title}</div>
        <div>{date}</div>
        <div>{name}</div>
      </div>
      <div hidden={showDetail} className="pet-info-container">
        {category === "Vaccines" && (
          <>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Food brand</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {foodBrand}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Food Flavor</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {foodFlavor}
              </p>
            </div>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Quantity bought/made</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {foodQuantity} g
              </p>
            </div>
          </>
        )}
        {category === "Food" && (
          <>
            <div className="pet-info-subcontainer">
              <h6 className="pet-subcontainer-title">Expiration Date</h6>
              <p
                className="pet-subcontainer-description"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {expirationDate}
              </p>
            </div>
          </>
        )}
        <div className="pet-info-subcontainer">
          <h6 className="pet-subcontainer-title">Comment</h6>
          <p
            className="pet-subcontainer-description"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            {comment}
          </p>
        </div>
      </div>
    </li>
  );
}

export default LogCard;

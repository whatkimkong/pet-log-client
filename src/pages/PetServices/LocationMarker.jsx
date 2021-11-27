import React, { useState, useEffect } from "react";
import { Marker, useMapEvents, Circle } from "react-leaflet";
import markerIcon from "../../images/marker.png";
import * as L from "leaflet";

function LocationMarker({
  setShowExtraContainer,
  setForm,
  selection,
  setSelection,
  position,
  setPosition,
  user,
}) {
  const [accuracy, setAccuracy] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      setSelection(e.latlng);
      setShowExtraContainer("form");
      setForm({
        category: "",
        name: "",
        image: "",
        description: "",
        schedule: "",
      });
    },
    locationfound: (e) => {
      setPosition(e.latlng);
      setAccuracy(e.accuracy);
      map.flyTo(e.latlng, 15);
    },
  });

  const LeafIcon = L.icon({
    iconSize: [30, 30],
    iconUrl: markerIcon,
  });

  useEffect(() => {
    map.locate();
  });

  if (position === null) {
    return null;
  }
  return (
    <>
      <Circle
        center={position}
        pathOptions={{ fillColor: "red", color: "transparent" }}
        radius={accuracy}
        className="blinking"
      />
      {selection && user && (
        <Marker position={selection} icon={LeafIcon}></Marker>
      )}
    </>
  );
}

export default LocationMarker;

import React, { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents, Circle } from "react-leaflet";

function LocationMarker({
  setShowForm,
  setForm,
  selection,
  setSelection,
  position,
  setPosition,
}) {
  const [accuracy, setAccuracy] = useState(null);

  const map = useMapEvents({
    click: (e) => {
      console.log("click", e);
      setSelection(e.latlng);
      setShowForm(false);
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
        pathOptions={{ fillColor: "blue" }}
        radius={accuracy}
      />
      {selection && <Marker position={selection}></Marker>}
    </>
  );
}

export default LocationMarker;

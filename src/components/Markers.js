import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import {getMarkers} from "../api/markersApi";

export default function Markers({ setSelected, addMenu, selected }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getMarkerList = async () => {
      const markerList = await getMarkers();
      setMarkers(markerList);
    };
    getMarkerList();
  }, [addMenu, selected]);

  const selectPlace = (marker)=>{
    setSelected(marker);
  }

  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.id} latitude={marker.lat} longitude={marker.lng}>
          <button className="marker-button" onClick={()=> selectPlace(marker)}>
            <img src={`/markers/${marker.marker}`} alt="map marker" />
          </button>
        </Marker>
      ))}
    </>
  );
}

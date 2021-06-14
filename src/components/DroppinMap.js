import { useState } from "react";
import ReactMapGL, { Popup, FlyToInterpolator } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import Login from "./Login";
import AddPlaceForm from "./AddPlaceForm";

function DropppinMap() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("user");
  const [addMenu, setAddMenu] = useState(null);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 29.42458,
    longitude: -98.49461,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });

  const zoom = (marker) => {
    setViewport((oldViewPort) => {
      return {
        ...oldViewPort,
        zoom: 17,
        longitude: marker.lng,
        latitude: marker.lat,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      };
    });
  };

  const review = (business) =>{
    setReviews(business.reviews);
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if (userType === "business") setAddMenu(e);
  };

  return (
    <>
      {loggedIn ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
          mapStyle="mapbox://styles/dstnmyrs99/ckmdrq2dsbxu517p8bdls5yv5"
          onViewportChange={(viewport) => setViewport(viewport)}
          onContextMenu={(e) => handleRightClick(e)}
        >
          <Markers
            setSelected={setSelected}
            addMenu={addMenu}
            selected={selected}
          />
          {selected && (
            <Popup
              latitude={selected.lat}
              longitude={selected.lng}
              onClose={() => setSelected(null)}
              closeOnClick={false}
            >
              <h2>{selected.name}</h2>
              <img
                src={selected.image_url}
                alt="place"
                className="place-image"
              />
              <p>{selected.description}</p>
              <div className="d-flex justify-content-between">
              <button className="btn btn-warning" onClick={() => zoom(selected)}>Zoom</button>
              <button className="btn btn-secondary" onClick={() => review(selected)}>Reviews</button>
              </div>
              
            </Popup>
          )}
          {addMenu && (
            <Popup
              latitude={addMenu.lngLat[1]}
              longitude={addMenu.lngLat[0]}
              onClose={() => setAddMenu(null)}
              closeOnClick={false}
            >
              <AddPlaceForm location={addMenu.lngLat} setAddMenu={setAddMenu} />
            </Popup>
          )}
        </ReactMapGL>
      ) : (
        <Login setLoggedIn={setLoggedIn} setUserType={setUserType} />
      )}
    </>
  );
}

export default DropppinMap;

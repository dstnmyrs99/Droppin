import axios from "axios";

const placesURL = process.env.REACT_APP_API_URL || "http://localhost:5000/places";
const usersURL = process.env.REACT_APP_API_URL || "http://localhost:5000/users";

export const getMarkers = async () => {
  const data = await axios.get(placesURL);
  return data.data;
};

export const createMarker = async (body) => {
  const data = await axios.post(placesURL, body);
  return data;
};

export const getUser = async (body) => {
  console.log(body);
  const data = await axios.post(`${usersURL}/${body.user_name}`, body);
  return data;
};

export const createUser = async (body) => {
  const data = await axios.post(`${usersURL}`, body);
  return data;
};

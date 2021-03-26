import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000/places";

export const getMarkers = async () => {
  const data = await axios.get(url);
  return data.data;
};

export const createMarker = async (body) => {
  const data = await axios.post(url, body);
  return data;
};


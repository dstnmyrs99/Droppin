import { useState } from "react";
import { createMarker } from "../api/markersApi";

export default function AddPlaceForm({ location, setAddMenu }) {
  const initialState = {
    name: "",
    description: "",
    image_url: "",
    marker: 'treasure-mark.png'
  };
  const [formData, setFormData] = useState({ ...initialState });
  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createMarker({
      ...formData,
      lat: location[1],
      lng: location[0],
    });
    setAddMenu(null);
    // setFormData({ ...initialState });
  };

  return (
    <form action="" onSubmit={handleSubmit} className="add-form">
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </label>
      <label htmlFor="description">
        Description:
        <input
          id="description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </label>
      <label htmlFor="image_url">
        Image url:
        <input
          id="image_url"
          type="text"
          name="image_url"
          onChange={handleChange}
          value={formData.image_url}
          required
        />
      </label>
      <label htmlFor="marker">
          Marker: 
        <select
          id="marker"
          name="marker"
          onChange={handleChange}
          value={formData.marker}
          required
        > 
          <option value="treasure-mark.png">X marks the spot</option>
          <option value="videogames.png">Video Games</option>
          <option value="foodtruck.png">Food Truck</option>
          <option value="fishing.png">Fishing Spot</option>
          <option value="yardsale.png">Yardsale</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

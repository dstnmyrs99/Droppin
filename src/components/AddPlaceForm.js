import { useState } from "react";
import { createMarker } from "../api/Api";

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
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
          placeholder="Name"
        />
      </label>
      <label htmlFor="description">
        <input
          id="description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
          placeholder="Description"
        />
      </label>
      <label htmlFor="image_url">
        <input
          id="image_url"
          type="text"
          name="image_url"
          onChange={handleChange}
          value={formData.image_url}
          required
          placeholder="Image URL"
        />
      </label>
      <label htmlFor="marker">
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

import { useState } from "react";
import { getUser, createUser } from "../api/Api";
import "./login.css";
export default function Login({ setLoggedIn, setUserType }) {
  const [formType, setFormType] = useState("login");
  const defaultData = { user_name: "", password: "", isBusiness: false };
  const [formData, setFormData] = useState(defaultData);
  const [errorData, setErrorData] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = ({ target }) => {
    const value =
      target.type === "checkbox" ? target.checked : target.value.trim();
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleLogChange = (event) => {
    event.preventDefault();
    formType === "login" ? setFormType("register") : setFormType("login");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await getUser({
        ...formData,
      });
      console.log(user.data);
      setUserType(user.data.type);
      setLoggedIn(true);
    } catch (err) {
      setErrorData("Incorrect Username or Password");
      setFormData({ ...defaultData });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await createUser({
        user_name: formData.user_name,
        password: formData.password,
        type: formData.isBusiness ? "business" : "user",
      });
      setSuccess("Username created successfully");
    } catch (err) {
      setErrorData("Username already in use");
      setFormData({ ...defaultData });
    }
  };

  const demo = (isBusiness) => {
    setLoggedIn(true);
    setUserType(isBusiness ? "business" : "user");

  }

  return (
    <>
      <div className="container w-50 mt-5">
        <button className="btn btn-primary m-5" onClick={()=> demo(false)}>Demo User</button>
        <button className="btn btn-primary m-5" onClick={()=> demo(true)}>Demo Bussiness</button>
        <h3>{formType === "login" ? "Login" : "Register"}</h3>
        <form onSubmit={formType === "login" ? handleLogin : handleRegister}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={formData.user_name}
              name="user_name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {formType === "register" && (
            <div>
              <span className="me-2 mb-5">Is this account for a business </span>
              <input
                type="checkbox"
                name="isBusiness"
                checked={formData.isBusiness}
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
          <button
            className="btn btn-primary mx-5 mt-3"
            onClick={handleLogChange}
          >
            {formType === "login" ? "Register" : "Login"}
          </button>
        </form>
        {errorData && (
          <div className="alert alert-danger m-5" role="alert">
            {errorData}
          </div>
        )}
        {success && (
          <div className="alert alert-success m-5" role="alert">
            {success}
          </div>
        )}
      </div>
    </>
  );
}

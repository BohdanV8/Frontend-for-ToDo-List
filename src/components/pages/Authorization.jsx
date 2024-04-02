import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../../context";
const Authorization = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        formData
      );
      localStorage.setItem("isAuth", response.data.userId);
      setIsAuth(response.data.userId);
      navigate("/home");
    } catch (error) {
      console.error("Error during signin:", error.message);
      setError("Помилка авторизації");
    }
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container forms">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-black">
            <div className="card-header">
              <h3 className="text-center">Sign in</h3>
            </div>
            <div className="card-body bg-black">
              <form className="dark" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="********"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Don't have an account yet?{" "}
                <Link className="nav-link" to="/registration">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;

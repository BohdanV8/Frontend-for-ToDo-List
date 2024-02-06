import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Відправка POST-запиту на сервер
      const response = await axios.post(
        "http://localhost:8080/user/reg",
        formData
      );
      localStorage.setItem("isAuth", response.data.userId);
      setIsAuth(response.data.userId);
      navigate("/home");
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError("Помилка реєстрації");
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
              <h3 className="text-center">Sign up</h3>
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

                <div className="form-group">
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
                </div>

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
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Have an account allready?{" "}
                <Link className="nav-link" to="/">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

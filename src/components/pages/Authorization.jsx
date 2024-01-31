import React from "react";
// import { Link } from "react-router-dom";

const Authorization = () => {
  return (
    <div className="container forms">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-black">
            <div className="card-header">
              <h3 className="text-center">Sign in</h3>
            </div>
            <div className="card-body bg-black">
              <form className="dark">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    required
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
                {/* <Link className="nav-link" to="/">
                  Sign up
                </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;

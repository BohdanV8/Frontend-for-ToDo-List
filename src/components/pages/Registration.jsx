import React from "react";

const Registration = () => {
  return (
    <div className="container forms">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-black">
            <div className="card-header">
              <h3 className="text-center">Sign up</h3>
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
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

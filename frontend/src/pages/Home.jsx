// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        paddingBottom: "10vh", // Full viewport height
        backgroundColor: "#f0f0f0", // Grey background
        width: "100%", // Ensure it spans the full width
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ flexGrow: 1 }}
      >
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-8 col-lg-8">
            <div
              className="card shadow-lg rounded-3"
              style={{
                minHeight: "400px",
                width: "100%",
                padding: "2rem",
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h2
                  className="card-title mb-4 fw-bold text-primary"
                  style={{ fontSize: "2.5rem" }}
                >
                  Welcome to the Task Manager
                </h2>
                <p
                  className="card-text mb-4 text-center"
                  style={{ fontSize: "1.25rem", color: "#555" }}
                >
                  Manage your tasks effortlessly with our Task Manager. Stay
                  organized by managing tasks, setting deadlines, and tracking
                  your progress. To get started, please log in or register.
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg px-4 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-secondary btn-lg px-4 py-2"
                    style={{ textDecoration: "none" }}
                  >
                    SignUp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

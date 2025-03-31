import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Conditionally render the Navbar based on the route */}
      <Routes>
        {/* Show navbar on non-dashboard routes */}
        <Route
          path="/"
          element={
            <>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <Link className="nav-link navbar-brand" to="/">
                    Home
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">
                          SignUp
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <Link className="nav-link navbar-brand" to="/">
                    Home
                  </Link>
                </div>
              </nav>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <Link className="nav-link navbar-brand" to="/">
                    Home
                  </Link>
                </div>
              </nav>
              <Register />
            </>
          }
        />

        {/* Protected Route for Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect to login if no match */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Toast, Container, Row, Col } from "react-bootstrap";
import "../css/login.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
      setShowToast(true);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light login-page"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} className="p-5 bg-white rounded shadow-lg">
          <h2 className="text-center mb-4 text-primary font-weight-bold">
            Welcome Back!
          </h2>

          {/* Login Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-4">
              <Form.Label className="text-dark">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control-lg border-primary shadow-sm"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label className="text-dark">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control-lg border-primary shadow-sm"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-4 py-2 btn-lg shadow-sm"
            >
              Login
            </Button>
          </Form>

          {/* Register Redirect Button */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={handleRegisterRedirect}
              className="text-muted"
            >
              Don't have an account?{" "}
              <span className="text-primary">Click here to SignUp</span>
            </Button>
          </div>

          {/* Error Toast */}
          {errorMessage && showToast && (
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              bg="danger"
              autohide
              delay={3000}
              className="position-fixed start-50 translate-middle-x shadow-lg d-flex align-items-center justify-content-center"
              style={{
                top: "80px", // Adjust position below navbar
                width: "320px", // Compact width
                height: "65px", // Adjusted height
                fontSize: "1rem", // Readable text size
                padding: "12px", // Adjusted padding
                textAlign: "center", // Ensures horizontal centering
              }}
            >
              <Toast.Body className="text-white">{errorMessage}</Toast.Body>
            </Toast>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

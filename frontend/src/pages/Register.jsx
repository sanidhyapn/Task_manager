import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Toast } from "react-bootstrap";

import "../css/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      setShowToast(true);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      style={{
        minHeight: "60vh", // Height is kept the same
        paddingTop: "13vh",
        paddingBottom: "40vh", // Space from the top is kept the same
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} className="p-5 bg-white rounded shadow-lg">
          <h2 className="text-center mb-4 text-primary font-weight-bold">
            Create an Account
          </h2>

          {/* Registration Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-4">
              <Form.Label className="text-dark">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control-lg border-primary shadow-sm"
              />
            </Form.Group>

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
              SignUp
            </Button>
          </Form>

          {/* Error Toast */}
          {errorMessage && showToast && (
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              bg="danger"
              autohide
              delay={3000}
              className="position-fixed bottom-0 start-50 translate-middle-x m-3 shadow-lg"
            >
              <Toast.Body className="text-white">{errorMessage}</Toast.Body>
            </Toast>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

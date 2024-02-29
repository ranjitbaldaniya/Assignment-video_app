import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../utils/AuthContect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const {  setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setValidationError("Please fill in all fields.");
        return;
      }


      // Clear the error message on successful login
      setValidationError("");

      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // console.log("res==>", response);
      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setIsAuthenticated(true)
        navigate("/videos");
      }
    } catch (error) {
      console.error("Login failed", error);
      setValidationError("Invalid email or password.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mx-auto" style={{ width: "500px" }}>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="text-primary">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="text-primary">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {validationError && (
                  <Alert variant="danger" className="text-center">
                    {validationError}
                  </Alert>
                )}

                <Button
                  variant="primary"
                  onClick={handleLogin}
                  className="w-100 mt-4"
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <small className="text-gray-700">
                  Don't have an account? Click here to{" "}
                  <Link to="/register" className="text-sky-500">
                    Register
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

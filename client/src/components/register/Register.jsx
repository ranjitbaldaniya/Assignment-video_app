import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

// console.log("formdata" , formData)


  const handleRegister = async () => {
    try {
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
        setValidationError('Please fill in all fields.');
        return;
      }

      // Clear the error message on successful registration
      setValidationError('');

      const response = await axios.post('http://localhost:3001/register', formData);
      // Assuming the server sends a token in the response
      document.cookie = `token=${response.data.token}`;
      navigate('/login')
    } catch (error) {
      console.error('Registration failed', error);
      setValidationError('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mx-auto" style={{ width: '500px' }}>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Form>
                <Form.Group controlId="formBasicFirstname" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastname" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {validationError && (
                  <Alert variant="danger" className="text-center">
                    {validationError}
                  </Alert>
                )}

                <Button
                  variant="primary"
                  onClick={handleRegister}
                  className="w-100 mt-4"
                >
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <small className="text-gray-700">
                  Already have an account? Click here to{' '}
                  <Link to="/login" className="text-sky-500">
                    Login
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

export default Register;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../../utils/AuthContect";

const AppNavbar = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setExpanded(false); 
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      expanded={expanded}
      onSelect={() => setExpanded(false)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-primary text-bol">
          Steaming App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
              <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/"
                  onClick={() => setExpanded(false)}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/videos"
                  onClick={() => setExpanded(false)}
                >
                  Videos
                </Nav.Link>
                <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/"
                  onClick={() => setExpanded(false)}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  className="text-primary"
                  as={Link}
                  to="/register"
                  onClick={() => setExpanded(false)}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

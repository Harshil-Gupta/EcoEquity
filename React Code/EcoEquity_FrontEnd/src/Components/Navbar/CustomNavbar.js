// src/Navbar.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function CustomNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="custom-navbar-container">
      {" "}
      {/* Add a specific class name */}
      <Navbar
        bg="purple"
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ marginLeft: "50px" }}
      >
        {/* <Container> */}
        <Navbar.Brand href="/">
          <img
            // src = "./LogoPhotos/logoSmall.png"
            src="https://i.ibb.co/5YDSCFz/logo4.png"
            // src="./LogoPhotos/logoEcoEquity.png"
            alt="Logo"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {/* <Navbar.Brand href="/">
            <img
            // src = "./LogoPhotos/logoSmall.png"
              src="https://www.natwest.com/content/dam/championlogos/Natwest_Secondary_Horizontal_RGB_NEG.svg"
              alt="Logo"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={NavLink}
              exact
              to="/"
              style={{ display: "flex", marginLeft: "50px", fontSize: "24px" }}
              activeClassName="active"
            >
              Home
            </Nav.Link>
            {localStorage.getItem("user") == null && (
              <Nav.Link
                as={NavLink}
                to="/register"
                style={{
                  display: "flex",
                  marginLeft: "50px",
                  fontSize: "24px",
                }}
                activeClassName="active"
              >
                Register
              </Nav.Link>
            )}
            {localStorage.getItem("user") == null && (
              <Nav.Link
                as={NavLink}
                to="/login"
                style={{
                  display: "flex",
                  marginLeft: "50px",
                  fontSize: "24px",
                }}
                activeClassName="active"
              >
                Login
              </Nav.Link>
            )}
            <Nav.Link
              as={NavLink}
              to="/Dashboard"
              style={{ display: "flex", marginLeft: "50px", fontSize: "24px" }}
              activeClassName="active"
            >
              Dashboard
            </Nav.Link>
            {localStorage.getItem("user") != null && (
              <Button
                variant="outline-light"
                onClick={handleLogout}
                style={{
                  float: "right",
                  display: "flex",
                  "flex-direction": "column",
                  marginLeft: "900px",
                  fontSize: "24px",
                }}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}

export default CustomNavbar;

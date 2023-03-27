import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../logo.png";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
        <Container>
          <Image
            src={logo}
            style={{ width: 70, height: 70 }}
            roundedCircle
          ></Image>
          <LinkContainer to="/">
            <Navbar.Brand>&nbsp;Andot's Food Services</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/viands">
                <Nav.Link>Viands</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/snacks">
                <Nav.Link>Snacks</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> My Cart
                </Nav.Link>
              </LinkContainer>
              {/* <NavDropdown title="Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Account Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Logout
                </NavDropdown.Item>
              </NavDropdown> */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

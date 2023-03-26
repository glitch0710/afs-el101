import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Andot's Food Services</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#menu">Menu</Nav.Link>
              <Nav.Link href="#viands">Viands</Nav.Link>
              <Nav.Link href="#snacks">Snacks</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#cart"><i className="fas fa-shopping-cart"></i>  My Cart</Nav.Link>
              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Account Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

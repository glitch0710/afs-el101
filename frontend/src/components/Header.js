import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, Image, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import logo from "../logo.png";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

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
              {/* <LinkContainer to="/viands">
                <Nav.Link>Viands</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/snacks">
                <Nav.Link>Snacks</Nav.Link>
              </LinkContainer> */}
            </Nav>
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> My Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-right-to-bracket"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

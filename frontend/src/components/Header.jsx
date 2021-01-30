import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer as Link } from 'react-router-bootstrap';

import './../styles/utilities.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Link to="/">
            <Navbar.Brand>MERNShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </Link>
              <Link to="/login">
                <Nav.Link>
                  <i className="fas fa-user "></i> Sign In
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="main-header">
        <div className="u-center-text u-margin-bottom-8">
          <h1>Welcome to MERNShop</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

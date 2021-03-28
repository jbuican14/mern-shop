import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer as Link, LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/user.action';

import './../styles/utilities.css';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Link to="/">
            <Navbar.Brand>MERNShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* WE HAVE ACCESS TO PROPS.HISTORY HERE SO WE PASS IT IN */}
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile" style={{ width: '70%' }}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    style={{ width: '70%' }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login">
                  <Nav.Link>
                    <i className="fas fa-user "></i> Sign In
                  </Nav.Link>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer
                    to="/admin/userlist"
                    style={{ width: '71%', position: 'relative' }}
                  >
                    <NavDropdown.Item
                      style={{ width: '85%', position: 'relative' }}
                    >
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to="/admin/productlist"
                    style={{ width: '71%', position: 'relative' }}
                  >
                    <NavDropdown.Item
                      style={{ width: '71%', position: 'relative' }}
                    >
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to="/admin/orderlist"
                    style={{ width: '71%', position: 'relative' }}
                  >
                    <NavDropdown.Item
                      style={{ width: '71%', position: 'relative' }}
                    >
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

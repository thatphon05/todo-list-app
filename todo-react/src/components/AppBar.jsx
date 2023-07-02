import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Appbar = () => {

  const { user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
      <Container>
        <Navbar.Brand>Todo List</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.username && (
                <>
                  <Nav.Link as={Link} to="/">All Todos</Nav.Link>
                
                  {user?.roles.includes('ROLE_ADMIN') && (
                    <Nav.Link as={Link} to="/">Admin</Nav.Link>
                  )}
                </>
              )
            }
          </Nav>
          <Nav>
            {user?.username ? (
                <>
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutHandler()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
            ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Appbar }
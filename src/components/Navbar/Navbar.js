import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../App';

function CustomNavbar() {
  const authValue = useContext(AuthContext);
  const history = useHistory();
  const { user, logout } = authValue;

  const onHandleLogout = () => {
    logout();
    history.push('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">MindX Images</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!user && (
            <>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup">Signup</Link>
              </Nav.Link>
            </>
          )}
          {user && (
            <NavDropdown title={`Welcome ${user.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/upload">Upload</Link></NavDropdown.Item>
              <NavDropdown.Item onClick={onHandleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar;
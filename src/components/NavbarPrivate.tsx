import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../FirebaseConfig';

function NavbarPrivate() {

  const logout = ()=>{
    return auth.signOut()
  }

  const { currentUser,notifCount } = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className='container-fluid' >
        <Navbar.Brand href="/">Habit Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <span style={{pointerEvents:"none"}} className='nav-link'><FontAwesomeIcon icon={faUser} style={{marginRight:"5px"}} />{currentUser?.email}</span>
            <Nav.Link style={{marginLeft:"20px"}}><FontAwesomeIcon icon={faSignOut} style={{marginRight:"5px"}} />Notifications {notifCount > 0 && <Badge bg="info">{notifCount}</Badge>}</Nav.Link>
            <Nav.Link style={{marginLeft:"20px"}} onClick={logout}><FontAwesomeIcon icon={faSignOut} style={{marginRight:"5px"}} />Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPrivate
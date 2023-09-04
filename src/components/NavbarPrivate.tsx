import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../FirebaseConfig';

function NavbarPrivate() {

  const logout = ()=>{
    console.log("sign out")
    return auth.signOut()
  }

  const { currentUser } = useContext(AuthContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className='container-fluid' >
        <Navbar.Brand href="#home">Habit Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <span style={{pointerEvents:"none"}} className='nav-link'>{currentUser?.email}</span>
            <Nav.Link href="#home" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPrivate
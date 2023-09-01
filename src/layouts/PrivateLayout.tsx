import { useContext } from "react"
import { Container } from "react-bootstrap"
import { Navigate, Outlet } from "react-router-dom"
import NavbarPrivate from "../components/NavbarPrivate"
import { AuthContext } from "../contexts/AuthContext"

function PrivateLayout() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
        <NavbarPrivate></NavbarPrivate>
        <Container style={{maxWidth:"90%",paddingTop:"20px"}}>
          {currentUser ? <Outlet/> : <Navigate to="/login"></Navigate>}
        </Container>

    </div>
  )
}

export default PrivateLayout
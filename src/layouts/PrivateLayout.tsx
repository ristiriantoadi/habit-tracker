import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import NavbarPrivate from "../components/NavbarPrivate"
import { AuthContext } from "../contexts/AuthContext"

function PrivateLayout() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
        <NavbarPrivate></NavbarPrivate>
        {currentUser ? <Outlet/> : <Navigate to="/login"></Navigate>}

    </div>
  )
}

export default PrivateLayout
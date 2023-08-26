import { Outlet } from "react-router-dom"
import NavbarPrivate from "../components/NavbarPrivate"

function PrivateLayout() {
  return (
    <div>
        <NavbarPrivate></NavbarPrivate>
        <Outlet></Outlet>

    </div>
  )
}

export default PrivateLayout
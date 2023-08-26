import { Outlet } from 'react-router'
import NavbarPublic from '../components/NavbarPublic'

function PublicLayout() {
  return (
    <div>
        <NavbarPublic></NavbarPublic>
        <Outlet></Outlet>
    </div>
  )
}

export default PublicLayout
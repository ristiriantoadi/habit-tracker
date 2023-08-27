import { Outlet } from 'react-router'

function PublicLayout() {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default PublicLayout
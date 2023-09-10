import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { NotificationModel } from "../../models/NotifModel"
import NotifCard from "./components/NotifCard"



function Notifications() {
    const { notifs } = useContext(AuthContext)
    return (
        <div>
            <h1>Notifications</h1>
            {/* {loading === true && <CircularLoaderBig/>} */}
            {notifs.map(item=><NotifCard notif={item as NotificationModel}></NotifCard>)}
        </div>
    )
}

export default Notifications
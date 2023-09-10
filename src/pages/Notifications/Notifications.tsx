import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import CircularLoaderBig from "../../components/CircularLoaderBig"
import { AuthContext } from "../../contexts/AuthContext"
import { db } from "../../FirebaseConfig"
import { NotificationModel } from "../../models/NotifModel"
import NotifCard from "./components/NotifCard"



function Notifications() {
    const { currentUser } = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    const [notifs,setNotifs] = useState<NotificationModel[]>([])
    const getNotifs = async ()=>{
        setLoading(true)
        const q = query(collection(db, "notifications"),
                    where("userId","==",currentUser?.uid),
                    orderBy("createTime","desc"));
        const data = await getDocs(q)
        const notifs = data.docs.map(doc => ({ ...doc.data(),id: doc.id} as NotificationModel))
        setNotifs(notifs)
        setLoading(false)
    }
    
    useEffect(()=>{
        getNotifs()
      },[])
    

    const sendReadNotifs = async ()=>{
        const q = query(collection(db, "notifications"),
                    where("userId","==",currentUser?.uid),
                    where("isRead","==",false))
        const data = await getDocs(q)
        const notifIds = data.docs.map(doc =>doc.id);
        for (let i=0;i<notifIds.length;i++){
            const ref = doc(db, "notifications", notifIds[i]);
            await updateDoc(ref,{"isRead":true})
        }
    }
    useEffect(()=>{
        sendReadNotifs()
      },[])

    return (
        <div>
            <h1>Notifications</h1>
            {loading === true && <CircularLoaderBig/>}
            {notifs.map(item=><NotifCard key={item.id} notif={item as NotificationModel}></NotifCard>)}
        </div>
    )
}

export default Notifications
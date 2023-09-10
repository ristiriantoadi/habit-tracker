import { User } from "firebase/auth"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import React, { ReactNode, useEffect, useState } from "react"
import CircularLoaderBig from "../components/CircularLoaderBig"
import { auth, db } from "../FirebaseConfig"
import { NotificationModel } from "../models/NotifModel"

interface AuthContextType{
    currentUser:User|null,
    notifCount:number
    notifs:NotificationModel[]
}

export const AuthContext = React.createContext<AuthContextType>({currentUser:null,notifCount:0,notifs:[]})

interface Props{
    children?:ReactNode
}




export const AuthProvider = ({ children }:Props) =>{
    const [currentUser,setCurrentUser] = useState<User|null>(null)
    const [loading,setLoading] = useState(true)
    const [notifCount,setNotifCount] = useState(0)
    const [notifs,setNotifs] = useState<NotificationModel[]>([])
    
    useEffect(()=>{
        const unsubscriber = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscriber
    },[])

    useEffect(()=>{
        if (currentUser == undefined) return
        const q = query(collection(db, "notifications"),
                    where("userId","==",currentUser?.uid),
                    where('isRead', '==', false),
                    orderBy("createTime","desc"));
        const unsubscribe = onSnapshot(q,(snapshot)=>{
            setNotifCount(snapshot.size)
            let notifications:NotificationModel[] = []
            snapshot.forEach((doc) => {
                notifications.push(doc.data() as NotificationModel)
            });
            setNotifs(notifications)

        })
        return unsubscribe
    },[currentUser])

    const value = {
        currentUser:currentUser,
        notifCount:notifCount,
        notifs:notifs
    }

    return (
        <div>
            {loading === true && <CircularLoaderBig></CircularLoaderBig>}
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}
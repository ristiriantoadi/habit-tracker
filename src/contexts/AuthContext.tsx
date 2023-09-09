import { User } from "firebase/auth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import React, { ReactNode, useEffect, useState } from "react"
import CircularLoaderBig from "../components/CircularLoaderBig"
import { auth, db } from "../FirebaseConfig"

interface AuthContextType{
    currentUser:User|null,
    notifCount:number
}

export const AuthContext = React.createContext<AuthContextType>({currentUser:null,notifCount:0})

interface Props{
    children?:ReactNode
}


export const AuthProvider = ({ children }:Props) =>{
    const [currentUser,setCurrentUser] = useState<User|null>(null)
    const [loading,setLoading] = useState(true)
    const [notifCount,setNotifCount] = useState(0)
    
    useEffect(()=>{
        const unsubscriber = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscriber
    },[])

    useEffect(()=>{
        // const q = query(collection(db, "notifications"), where("userId", "==", currentUser));
        if (currentUser == undefined) return
        const q = query(collection(db, "notifications"),where("userId","==",currentUser?.uid),where('isRead', '==', false));
        const unsubscribe = onSnapshot(q,(snapshot)=>{
            setNotifCount(snapshot.size)
        })
        return unsubscribe
    },[currentUser])

    const value = {
        currentUser:currentUser,
        notifCount:notifCount
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
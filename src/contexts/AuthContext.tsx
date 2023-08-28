import { User } from "firebase/auth"
import React, { ReactNode, useEffect, useState } from "react"
import { auth } from "../FirebaseConfig"

interface AuthContextType{
    currentUser:User|null,
}

export const AuthContext = React.createContext<AuthContextType>({currentUser:null})

interface Props{
    children?:ReactNode
}


export const AuthProvider = ({ children }:Props) =>{
    const [currentUser,setCurrentUser] = useState<User|null>(null)
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const unsubscriber = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscriber
    },[])

    return (
        <div>
            {loading === true && <div>Loading...</div>}
            <AuthContext.Provider value={{currentUser}}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}
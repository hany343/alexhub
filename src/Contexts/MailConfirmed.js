import { createContext, useContext, useState } from "react"; 

export let MailContext=createContext()

export default function AuthContextProvider({children}){
    let [isMailConfirmed, setMailConfirmed]=useState(false)
    return <AuthContext.Provider value={{isMailConfirmed, setMailConfirmed}}>
        {children}
    </AuthContext.Provider>

}
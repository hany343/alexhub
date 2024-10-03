import { createContext, useContext, useState } from "react"; 

export let UserContext=createContext()

export default function AuthContextProvider({children}){
    let [UserData, setUserData]=useState([])
    return <AuthContext.Provider value={{UserData,setUserData}}>
        {children}
    </AuthContext.Provider>

}
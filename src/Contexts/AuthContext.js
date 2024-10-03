import { createContext, useContext, useState } from "react"; 

export let AuthContext=createContext()

export default function AuthContextProvider({children}){
    let [UserIsLogedIn, setUserIsLogedIn]=useState()
    let [UserData, setUserData]=useState([])

    return <AuthContext.Provider value={{UserIsLogedIn,setUserIsLogedIn,UserData,setUserData}}>
        {children}
    </AuthContext.Provider>

}
import React from "react";
import Sidebar from "../SideBars/Sidebar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import '../App.css'
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import AdminBar from "../sidbartemp/AdminBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar2 from "../sidbartemp/SideBar2";

export default function Layout() {
    let { UserIsLogedIn, UserData } = useContext(AuthContext);
    let sidMenu = null
    return (
        <>
                    
            <div className="d-flex  vh-100 position-relative">

                <div className="">
                { UserIsLogedIn?
                        <Sidebar />
                        :''
                }
                </div>
                <div className=" w-100 vh-100 ">
                    {

                        /* Components (container)*/

                    }<Outlet />
                   
                </div>
                <div className="text-white text-center position-fixed w-100  fs-6 mb-1 bg-dark opacity-50" style={{zIndex:'1000!important',bottom:'0'}}>
                    IAlex ticketing system for AlexApparels Team - Developer "Hany Ragab"</div>
            </div>

        </>

    )
}
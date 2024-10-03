import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem

} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import logos from '../Assets/A512.png';
import './Sidebar.style.css'
import { AuthContext } from '../Contexts/AuthContext';
import { useContext } from 'react';


 function AdminBar() {
  let {UserIsLogedIn,UserData}=useContext(AuthContext);
  console.log(UserIsLogedIn)
  return (
  <>
  {UserIsLogedIn?
    <div className='border-5 border-end border-white' style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          
           <span className=' text-aqua'>Alex</span>
           <img src={logos} className="bg-transparent" alt="logo" width={100}/>
             </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              
            </NavLink>
            <NavLink exact to="/tasks" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tasks</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/register" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Status</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Reports</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter >
          <div
            style={{
              padding: '10px 5px',
              color:'green',
              boxShadow:'0px 0px 2px 1px white',
              borderRadius:'10%',
              marginBottom:'15px',
              fontSize:'20px'
            }}
          >
             
              <CDBSidebarMenuItem icon="user">{UserData.fname}{console.log(UserData)}</CDBSidebarMenuItem>
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
:
console.log(UserIsLogedIn)
          }
</>
  );
};

export default AdminBar;
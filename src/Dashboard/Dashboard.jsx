import  { React,useContext, useEffect } from 'react'
import NewTicket from '../Tickets/NewTicket'
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, redirect } from 'react-router-dom';

export default function Dashboard() {
  let { UserData,UserIsLogedIn } = useContext(AuthContext);
  
  useEffect(()=>{
   
  },[])
  return (
    <>
    {UserIsLogedIn?
   <div className="container-fluid bg-dark text-white opacity-90 my-5 w- border-2 rounded-4" style={{boxShadow:'0px 0px 10px 2px grey',width:'95%'}}>
   <h1>Dashboard</h1>

   <h1>Welcome <span className='text-aqua'>{UserData.fname}</span></h1>
 </div>
      :
      <Navigate to="/Login"/>
    
    }
   
    
    </>
  )
}

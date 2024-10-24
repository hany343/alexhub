import  { React,useContext, useEffect, useState } from 'react'
import NewTicket from '../Tickets/NewTicket'
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, redirect } from 'react-router-dom';
import TicketCard from '../components/TicketCard';

export default function Dashboard() {
  let { UserData,UserIsLogedIn } = useContext(AuthContext);
  const api_url = "https://localhost:7014/Tickets/Dashboard";
  let [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    fetch(api_url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok: " + res.statusText);
        }
        return res.json(); 
      })
      .then((data) => {
        setTickets(data); 
      })
      .catch((error) => {
        console.error("There was an issue with the fetch operation:", error);
      });
  }, []);
   
console.log();
  return (
    <>
    {UserIsLogedIn?
   <div className="container-fluid bg-dark text-white opacity-90 my-5 w- border-2 rounded-4" style={{boxShadow:'0px 0px 10px 2px grey',width:'95%'}}>
   <h1>Dashboard</h1>
   

   <h1>Welcome <span className='text-aqua'>{UserData.fname}</span></h1>
   <div>
    {tickets.length === 0 ? (
      <p>No tickets available.</p> // Message when there are no tickets
    ) : (
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>{ticket.title}</li> // Replace with appropriate ticket property
        ))}
      </ul>
    )}
  </div>
 </div>
      :
      <Navigate to="/Login"/>
    
    }
   <TicketCard />


    
    </>
  )
}

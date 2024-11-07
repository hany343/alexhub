import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import TicketCard from '../components/TicketCard';
import RecentActions from '../components/RecentActions';

export default function Dashboard() {
  const { UserData, UserIsLogedIn } = useContext(AuthContext);
  const api_url = "http://localhost:5077/Tickets/Dashboard";
  
  const [tickets, setTickets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(api_url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data) {
          setTickets(data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError(error);
        setTickets({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [api_url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const openTicketsCount = tickets.openTickets;
  const assignedTicketsCount = tickets.assignedTickets;
  const closedTicketsCount = tickets.closedTickets;
  const logs = tickets.logs || []; // Assuming logs is the name in your API response
console.log(UserData)
  return (
    <>
      {UserIsLogedIn ? (
        <div className="Text3D dashboard" style={{ width: '90%', paddingLeft: "5%", paddingTop: "20px" }}>
          <h1>Dashboard</h1>
          <hr />
          <div style={{ textAlign: "center" }}>
            <h1>Welcome <span className='text-primary'>{UserData.value.fname}</span></h1>
          </div>
        </div>
      ) : (
        <Navigate to="/Login" />
      )}
      
      <TicketCard 
        OpenT={openTicketsCount} 
        AssignedT={assignedTicketsCount} 
        ClosedT={closedTicketsCount} 
      />
      <div className='TActions' style={{margin:"auto"}}> 
        <RecentActions logs={logs} /> {/* Pass logs to RecentActions */}
      </div>
    
    </>
  );
}

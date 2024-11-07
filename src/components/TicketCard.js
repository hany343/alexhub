import React from "react";
import "../App.css";

function TicketCard({ OpenT, AssignedT, ClosedT }) {
  return (
    <div className="card-container">
      <div className="cardD open-ticket">
        <h2>Open Tickets</h2>
        <p className="ticket-count">{OpenT}</p>
        <p className="description">
          Tickets that are currently open and awaiting action.
        </p>
      </div>
      <div className="cardD assigned-ticket">
        <h2>Assigned Tickets</h2>
        <p className="ticket-count">{AssignedT}</p>
        <p className="description">
          Tickets that are currently assigned to team members.
        </p>
      </div>
      <div className="cardD closed-ticket">
        <h2>Closed Tickets</h2>
        <p className="ticket-count">{ClosedT}</p>
        <p className="description">
          Tickets that have been resolved and closed.
        </p>
      </div>
    </div>
  );
}

export default TicketCard;

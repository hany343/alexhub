import React from "react";
import "../App.css";
function TicketCard() {
  return (
    <div className="card-container">
      <div
        className="card open-ticket0"
        style={{ backgroundColor: "rgba(94, 191, 81, 0.8)" }}
      >
        <h2>Open Tickets</h2>
        <p className="ticket-count">23</p>
        <p className="description">
          Tickets that are currently open and awaiting action.
        </p>
      </div>
      <div
        className="card assigned-ticket"
        style={{ backgroundColor: "rgba(207, 229, 93, 0.8)" }}
      >
        <h2>Assigned Tickets</h2>
        <p className="ticket-count">15</p>
        <p className="description">
          Tickets that are currently assigned to team members.
        </p>
      </div>
      <div
        className="card closed-ticket"
        style={{ backgroundColor: "rgba(229, 93, 111, 0.8)" }}
      >
        <h2>Closed Tickets</h2>
        <p className="ticket-count">10</p>
        <p className="description">
          Tickets that have been resolved and closed.
        </p>
      </div>
    </div>
  );
}

export default TicketCard;

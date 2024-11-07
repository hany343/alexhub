import React from "react";

function RecentActions({ logs }) {
  return (
    <div
      style={{
        width: "90%", // Set width to 90% of the page
        boxSizing: "border-box",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)", // Center the div horizontally
        margin: "auto",
      }}
    >
      <h3 className="Text3D mb-5" style={{ textAlign: "center" }}>
        Recent Actions
      </h3>
      <div className="scroll-container x" style={{ height: "30vh", overflowY: "scroll", margin: "auto" }}>
        <table className="table table-dark table-hover" style={{ textAlign: "center" }}>
          <thead className="table-info">
            <tr>
              <th scope="col">Ticket ID</th>
              <th scope="col">Subject</th>
              <th scope="col">Issue</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">Tech Support</th>
              <th scope="col">Last Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {logs && logs.length > 0 ? (
              logs.map((log, index) => (
                <tr key={index}>
                  <td>
                    <span className="mx-1 fw-bold">{log.tid}</span>
                  </td>
                  <td>
                    <span className="mx-1 fw-bold">{log.subject}</span>
                  </td>
                  <td>
                    <span className="mx-1 fw-bold">{log.issue}</span>
                  </td>
                  <td>
                    <span className="mx-1 fw-bold">
                      {log.status === "Pending" ? (
                        <span className="text-primary fw-bold mx-1">
                          {log.status}
                        </span>
                      ) : log.status === "Assigned" ? (
                        <span className="text-warning fw-bold mx-1">
                          {log.status}
                        </span>
                      ) : (
                        <span className="fw-bold mx-1">{log.status}</span>
                      )}
                    </span>
                  </td>
                  <td>
                    {log.action === "Solved" ? (
                      <span className="text-success fw-bold">
                        <span className="text-success fw-bold mx-1">
                          {log.action}
                        </span>
                      </span>
                    ) : (
                      <span className="text-danger mx-1 fw-bold">Unsolved</span>
                    )}
                  </td>
                  <td>
                    {log.agent?.fname ? (
                      <span className="text-success fw-bold">
                        <span className="mx-1">{log.agent.fname}</span>
                      </span>
                    ) : (
                      <span className="text-warning mx-2  fw-bold">
                        No Tech Support
                      </span>
                    )}
                  </td>
                  <td className="text-end">
                    {log.lastlog ? (
                      (() => {
                        const actionTime = new Date(log.lastlog.actionTime);
                        const now = new Date();
                        const timeDiff = Math.abs(now - actionTime);
                        const days = Math.floor(
                          timeDiff / (1000 * 60 * 60 * 24)
                        );
                        const minutes = Math.floor(
                          (timeDiff / (1000 * 60)) % 60
                        );
                        const seconds = Math.floor((timeDiff / 1000) % 60);
                        if (days === 0) {
                          if (minutes === 0) {
                            return <span className="">{seconds}s ago</span>;
                          } else {
                            return <span className="">{minutes}m ago</span>;
                          }
                        } else if (days < 3) {
                          return (
                            <span className=" fw-bold">{days} days ago</span>
                          );
                        } else {
                          return (
                            <span className=" fs-6 fw-bold">
                              {actionTime.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </span>
                          );
                        }
                      })()
                    ) : (
                      <span className=" fw-bold">No recent action</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No actions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentActions;

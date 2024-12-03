import React, { useState, useEffect } from "react";
import "./StudentStatusPage.css"; // Import CSS file for styling

function StudentStatusPage() {
  // Mock data for complaints and requests
  const [complaints, setComplaints] = useState([]);
  const [requests, setRequests] = useState([]);

  // Mock API call to fetch complaints and requests data
  useEffect(() => {
    // Simulate fetching complaints and requests data from an API
    const fetchComplaintsAndRequests = () => {
      // Mock complaints data
      const mockComplaints = [
        { id: 1, subject: "Wifi Connectivity", status: "In Progress" },
        { id: 2, subject: "Library Access", status: "Resolved" },
        { id: 3, subject: "Classroom Equipment", status: "Pending" },
      ];

      // Mock requests data
      const mockRequests = [
        { id: 1, type: "Degree Issuance", status: "Pending" },
        { id: 2, type: "Transcript Request", status: "Resolved" },
      ];

      // Update state with mock data
      setComplaints(mockComplaints);
      setRequests(mockRequests);
    };

    // Call the fetch function
    fetchComplaintsAndRequests();
  }, []);

  return (
    <div>
      <h2>Student Status Page</h2>
      <h3>Complaints</h3>
      <table className="status-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.subject}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Requests</h3>
      <table className="status-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.type}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentStatusPage;

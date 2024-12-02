import React, { useEffect, useState } from "react";
import "./Arena.css";
import NavBar from './Navbar';

const Arena = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5006/api/arenaBookings/getBookings"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as 'MM/DD/YYYY'
  };

  // Function to format time (HH:MM AM/PM)
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options); // Format time as 'HH:MM AM/PM'
  };

  return (
    <div className="bookingpage">
      <NavBar />
      <div className="bookings-container">
        <h1>Bookings Management</h1>
        <div className="tabs"></div>
        <div className="content">
          <h2>All Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.status}</td>
                  <td>{formatDate(booking.bookingDate)}</td>
                  <td>{formatTime(booking.startTime)}</td>
                  <td>{formatTime(booking.endTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Arena;

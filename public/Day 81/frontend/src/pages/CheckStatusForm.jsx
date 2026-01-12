import React, { useState } from "react";
import "./CheckStatusForm.css";

const CheckStatusForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [appointment, setAppointment] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/appointments/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      const data = await res.json();
      if (data.appointment) {
        setAppointment(data.appointment);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Error checking status:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/update/${appointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });
      const data = await res.json();
      alert("Appointment updated!");
      setAppointment(data);
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <div className="status-container">
      <div className="status-card">
        <h2>🔍 Check Appointment Status</h2>
        <form onSubmit={handleCheck} className="status-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            type="number"
            required
          />
          <button type="submit">Check Status</button>
        </form>

        {appointment && (
          <div className="result-card">
            <h3>Status: <span className={`status-label ${appointment.status.toLowerCase()}`}>{appointment.status}</span></h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <label>
                Problem Description:
                <textarea
                  value={appointment.description}
                  onChange={(e) => setAppointment({ ...appointment, description: e.target.value })}
                />
              </label>
              <label>
                Slot:
                <input
                  type="text"
                  value={appointment.slot}
                  onChange={(e) => setAppointment({ ...appointment, slot: e.target.value })}
                />
              </label>
              <button type="submit" className="update-btn">Update Appointment</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatusForm;
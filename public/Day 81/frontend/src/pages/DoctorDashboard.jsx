import React, { useState } from "react";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [patients] = useState([
    { id: 1, name: "Sunetra Bar", age: 20 },
    { id: 2, name: "Debjani Bar", age: 22 },
    { id: 3, name: "Anima Bar", age: 22},
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Sunetra Bar", date: "2026-01-10", time: "10:00 AM", status: "Pending" },
    { id: 2, patient: "Debjani Bar", date: "2026-01-11", time: "2:00 PM", status: "Pending" },
    { id: 3, patient: "Anima Bar", date: "2026-01-12", time: "11:00 AM", status: "Pending" },
  ]);

  const [prescriptions, setPrescriptions] = useState({});

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  const handlePostpone = (id, newDate) => {
    if (!newDate) return;
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, date: newDate, status: "Postponed" } : a
      )
    );
  };

  const handlePrescriptionUpload = (patientId, e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptions({
        ...prescriptions,
        [patientId]: file.name,
      });
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">🩺 Doctor Dashboard</h1>

      {/* Patient List */}
      <section className="card">
        <h2>👨‍👩‍👧 Patient List</h2>
        <ul>
          {patients.map((p) => (
            <li key={p.id} className="list-item">
              <span className="patient-name">{p.name}</span> (Age: {p.age})
            </li>
          ))}
        </ul>
      </section>

      {/* Appointment Management */}
      <section className="card">
        <h2>📅 Appointment Management</h2>
        <ul>
          {appointments.map((a) => (
            <li key={a.id} className="appointment-item">
              <div>
                <span className="appointment-patient">{a.patient}</span> — {a.date} at {a.time}
                <span className={`status ${a.status.toLowerCase()}`}> [{a.status}]</span>
              </div>
              <div className="actions">
                <button onClick={() => handleStatusChange(a.id, "Okay")}>Okay</button>
                <input
                  type="date"
                  onChange={(e) => handlePostpone(a.id, e.target.value)}
                  className="date-input"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Prescription Upload */}
      <section className="card">
        <h2>💊 Prescription Upload</h2>
        <ul>
          {patients.map((p) => (
            <li key={p.id} className="prescription-item">
              <span className="patient-name">{p.name}</span>
              <input
                type="file"
                onChange={(e) => handlePrescriptionUpload(p.id, e)}
              />
              {prescriptions[p.id] && (
                <span className="uploaded-file">Uploaded: {prescriptions[p.id]}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DoctorDashboard;
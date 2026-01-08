import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import DoctorDashboard from "./pages/DoctorDashboard";
import AppointmentForm from "./pages/AppointmentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/appointment" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import AboutUs from "./AboutUs";
import Dashboard from "./Dashboard";
import OrderManagement from "./OrderManagement";
import Deliveries from "./Deliveries";
import Customers from "./Customers";
import Drivers from "./Drivers";
import DashboardLayout from "./DashboardLayout";
import FetchData from "./FetchData";
import UsData from "./UsData";


import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/login" /> : <SignUp />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Protected Routes (Require Authentication) */}
        <Route path="/" element={<DashboardLayout isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/fetchdata" element={<FetchData />} />
          <Route path="/usdata" element={<UsData />} />
          
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

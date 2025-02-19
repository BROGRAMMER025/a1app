import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />; // Redirect if not authenticated

  return (
    <div style={{ display: "flex" }}>
      <SideBar /> {/* Sidebar always visible */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "260px" }}>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </div>
    </div>
  );
};

export default DashboardLayout;

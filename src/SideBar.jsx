import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaTruck, FaClipboardList, FaUsers, FaHome } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open state
  const location = useLocation(); // Get current route for active state highlighting

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ ...styles.sidebar, width: isOpen ? "250px" : "60px" }}>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} style={styles.toggleButton}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        <Link to="/dashboard" style={location.pathname === "/dashboard" ? styles.activeLink : styles.link}>
          <FaHome style={styles.icon} />
          {isOpen && "Dashboard"}
        </Link>

        <Link to="/orders" style={location.pathname === "/orders" ? styles.activeLink : styles.link}>
          <FaClipboardList style={styles.icon} />
          {isOpen && "Orders"}
        </Link>

        <Link to="/deliveries" style={location.pathname === "/deliveries" ? styles.activeLink : styles.link}>
          <FaTruck style={styles.icon} />
          {isOpen && "Deliveries"}
        </Link>

        <Link to="/customers" style={location.pathname === "/customers" ? styles.activeLink : styles.link}>
          <FaUsers style={styles.icon} />
          {isOpen && "Customers"}
        </Link>

        <Link to ="/drivers" style={location.pathname ==="/drivers"? styles.activeLink : styles.link}>
          <FaUsers style = {styles.icon}/>
          {isOpen && "Drivers"}
        </Link>

        <Link to ="/fetchdata" style={location.pathname === "/fetchdata" ? styles.activeLink : styles.link}>
        <FaClipboardList style={styles.icon} />
        {isOpen && "FetchData"}
        </Link>

        <Link to="/usdata" style={location.pathname ==="/usdata" ? styles.activeLink : styles.link}>
        <FaClipboardList style={styles.icon} />
        {isOpen && "USData"}
        </Link>
        
          
      </nav>
    </div>
  );
};

// Sidebar styles
const styles = {
  sidebar: {
    height: "100vh",
    backgroundColor: "#1E1E2D",
    color: "#fff",
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    transition: "width 0.3s ease",
    overflowX: "hidden",
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  },
  toggleButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#ccc",
    padding: "15px",
    fontSize: "18px",
    transition: "background 0.3s",
  },
  activeLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    padding: "15px",
    fontSize: "18px",
    backgroundColor: "#007bff",
    borderLeft: "5px solid #fff",
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px",
  },
};

export default SideBar;

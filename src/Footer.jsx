import React from "react";
import { FaTwitter, FaInstagram, FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p style={styles.text}>New features coming soon</p>
      <div style={styles.rightSection}>
        <p style={styles.copyright}>
          <FaCopyright /> 2025
        </p>
        <FaTwitter style={styles.icon} />
        <FaInstagram style={styles.icon} />
      </div>
    </div>
  );
};

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginLeft: "20px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  icon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  copyright: {
    marginRight: "10px",
  },
};

export default Footer;

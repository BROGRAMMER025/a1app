import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./AboutUs.css"; 

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2>About Us</h2>
        <p>
          Welcome to **FastTrack Delivery**, your reliable partner for quick and secure deliveries. 
          We specialize in delivering packages with speed and efficiency while ensuring the best customer experience.
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            <span>+1 (234) 567-890</span>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <span>123 Delivery Lane, New York, NY</span>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <span>support@fasttrack.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    textAlign: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    margin: "auto",
  },
  input: {
    padding: "8px",
    marginRight: "5px",
    width: "100%",
    },
  };

export default AboutUs;

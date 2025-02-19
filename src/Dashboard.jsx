import React from "react";
import OrderManagement from "./OrderManagement";
import Footer from "./Footer";
import SideBar from "./SideBar";

import Customers from "./Customers";
import Deliveries from "./Deliveries";
import Drivers from "./Drivers"

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      
      <OrderManagement />
      <SideBar/>
      <Footer/>
      
      <Customers/>
      <Deliveries/>
      <Drivers/>
    
    </div>
  );
};

export default Dashboard;

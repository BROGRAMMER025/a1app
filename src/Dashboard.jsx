import React from "react";


import SideBar from "./SideBar";
import OperatingCashTable from "./OperatingCashTable";



const Dashboard = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      
      
      <SideBar/>
      
      
     <OperatingCashTable/>
    
    </div>
  );
};

export default Dashboard;

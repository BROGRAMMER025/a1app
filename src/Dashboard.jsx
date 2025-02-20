import React from "react";


import SideBar from "./SideBar";
import OperatingCashTable from "./OperatingCashTable";

import UsData from "./UsData";

const Dashboard = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      
      
      <SideBar/>

      <UsData/>
      
      <OperatingCashTable/>
    </div>
  );
};

export default Dashboard;

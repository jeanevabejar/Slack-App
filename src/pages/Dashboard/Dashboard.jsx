import React from "react";
import  Navbar  from "Components/Navbar";
import { Outlet } from "react-router-dom";



const Dashboard = () => {
  return (
    <>
     <div className="dashboard-page">
      <Navbar />   
      <Outlet/>
    </div>
    </>
  )
}

export default Dashboard

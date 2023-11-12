import React from "react";
import  Navbar  from "../../Components/Navbar";
import logo from "../../assets/logo.png";


const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <div className="dash-message">
          <h1>
            <img src={logo} alt="" />
            Welcome to
          </h1>
          <h1>Froggy Messenger</h1>
        </div>
      <div className="dash-message2">
          <h1>
            Hang out anytime, anywhere. Froggy messenger makes it easy and fun
            to stay close to your favorite people.
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

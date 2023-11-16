import React from "react";
import logo from "assets/logo.png";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="home-container">
        <div className="home-text">
          <h1>
            <img src={logo} alt="" />
            Welcome to
          </h1>
          <h1>Froggy Messenger</h1>
        </div>
        <div className="home-subtext">
          <h1>
            Hang out anytime, anywhere. Froggy messenger makes it easy and fun
            to stay close to your favorite people.
          </h1>
        </div>
         <Button className="home-btn" text="Get Started" onClick={()=>{
          navigate("/signup");
         }}/>
      </div>
   
    </>
  );
};

export default Home;

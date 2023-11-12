import React from 'react'
import logo from "../../assets/logo.png";

const Home = () => {
  return (
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
      </div>
  )
}

export default Home
import React from 'react'
import logo from "../assets/logo.png";



const Preloader = () => {
  return (
    <h1 className="app">
    <img src={logo} alt="" className="loader-logo" />
    Hell<span className="loader"></span>!
  </h1>
  )
}

export default Preloader
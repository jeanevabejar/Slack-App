import React from "react";
import logo from "../../assets/logo.png";
import { Form, Link } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";


const Login = () => {
  return (
    <div className="sign-in-page" >
    <div className="login-container">
      <img src={logo} alt="FroggyLogo" className="login-logo" />
      <Form className="login-form" action="/dashboard">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit" text={"Log In"}/>
      </Form>
      <div className="suggestion-container">
        <h3>Don't have account?</h3>
        <Link to="/signup" className="sign-up-btn">Create</Link>
      </div>
    </div>
  </div>
  )
}

export default Login


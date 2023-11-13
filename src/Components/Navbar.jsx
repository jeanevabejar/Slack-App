import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Home, MessagesSquare, UserCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button/Button";

const Navbar = () => {
  const location = useLocation();///give the exact url where u are 
  const navigate = useNavigate();///give you access to other url

  const isActive = (path) => {
    console.log("Current Path:", location.pathname);
    console.log("Specified Path:", path);
    return location.pathname === path;
  };

  return (
    <div className="nav-container">
      <div className="nav-primary-icon">
        <img src={logo} alt="logo.png" />
        <Button
          className={isActive("/dashboard/home") ? "home-active" : "home-icon"}
          text={<Home size={30} onClick={() => navigate("home")} />}
        />
        <Button
          className={isActive("/dashboard") ? "messenger-active" : "home-icon"}
          text={<MessagesSquare size={30} onClick={() => navigate("/dashboard")} />}
        />
      </div>
      <div className="nav-icon-user">
        <Button
          className="user-icon"
          onClick={() => {
            navigate("/login");
          }}
          text={<UserCircle2 size={35} />}
        />
      </div>
    </div>
  );
};


export default Navbar;

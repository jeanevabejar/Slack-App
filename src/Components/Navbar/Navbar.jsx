import React, { useState } from "react";
import logo from "assets/logo.png";
import { IoHome } from "react-icons/io5";
import { PiChatsCircleBold } from "react-icons/pi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "components/Button";
import TooltipContainer from "components/Tooltip";

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const isActive = (path) => {
    // console.log("Current Path:", location.pathname);
    // console.log("Specified Path:", path);
    return location.pathname === path;
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-primary-icon">
          <img src={logo} alt="logo.png" />
          <Button
            className={
              isActive("/dashboard/home") ? "home-active" : "home-icon"
            }
            text={<IoHome size={30} data-tooltip-id="home" />}
            onClick={() => navigate("home")}
          />
          <Button
            className={
              isActive("/dashboard/messenger/search")
                ? "messenger-active"
                : "home-icon"
            }
            text={<PiChatsCircleBold size={30} data-tooltip-id="messenger" />}
            onClick={() => navigate("messenger/search")}
          />
        </div>
        <div className="nav-icon-user">
          <Button
            className={
              isActive("/dashboard/settings")
                ? "user-active"
                : "user-icon"
            }
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            text={<HiOutlineUserCircle size={35} data-tooltip-id="user" />}
          />
        </div>
      </div>
      <TooltipContainer />
    </>
  );
};

export default Navbar;

import React from "react";
import logo from "../assets/logo.png";
import { Home, MessagesSquare, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button/Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div className="nav-primary-icon">
        <img src={logo} alt="" />
        <Button className="icon1" text={<Home size={30}  onClick={() => {
            setTimeout(()=>{navigate("/home")}, 500);
          }} />} />
        <Button className="icon2" text={<MessagesSquare size={30} />} />
      </div>
      <div className="nav-icon-user">
        <Button
          className="icon3"
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

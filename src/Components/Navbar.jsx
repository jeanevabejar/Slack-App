import React from "react";
import logo from "../assets/logo.png";
import { Home, MessagesSquare, UserCircle2 } from "lucide-react";


const Navbar = () => {

  return (
    <div className="nav-container">
      <div className="nav-primary-icon">
        <img src={logo} alt="" />
        <button className="icon1">
         <Home size={30} />
        </button>
        <button className="icon2">
          <MessagesSquare size={30} />
        </button>
      </div>
      <div className="nav-icon-user">
        <button className="icon3" >
        <UserCircle2 size={35}/>
        </button>
      </div>
    </div>
  )
}

export default Navbar

import React from "react";
import { Outlet} from "react-router-dom";
import MessengerNavbar from "Components/MessengerNavbar";


const NavbarExtension = () => {
  

  return (
    <>
      <div className="nav-extension">
        <div className="inner-container">
        <MessengerNavbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NavbarExtension;

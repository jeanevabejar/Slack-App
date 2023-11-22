import React from "react";
import TooltipContainer from "components/Tooltip";
import { Outlet} from "react-router-dom";
import MessengerNavbar from "components/MessengerNavbar";


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

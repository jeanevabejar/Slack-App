import React from "react";
import Button from "components/Button";
import { GoPersonAdd } from "react-icons/go";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import TooltipContainer from "components/Tooltip";
import { Outlet, useNavigate } from 'react-router-dom';


const NavbarExtension = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="nav-extension">
        <div className="inside-container">
          <div className="option-container">
            <div className="messenger-option">
              <Button
                className="add-icon"
                text={<GoPersonAdd size={30}data-tooltip-id="adduser" />}
                onClick={()=>{navigate("search")}}
              />
              <Button
                className="dm-icon"
                text={
                  <BiSolidCommentAdd
                    size={30} data-tooltip-id="directmessage"
                  />
                }
              />
              <Button
                className="channel-icon"
                text={
                  <AiOutlineUsergroupAdd size={30}data-tooltip-id="channels"  />
                }
              />
            </div>
          </div>
          <Outlet/>
        </div>
      </div>
      <TooltipContainer/>
    </>
  );
};

export default NavbarExtension;

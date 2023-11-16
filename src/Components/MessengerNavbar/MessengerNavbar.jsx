import React from 'react'
import Button from "components/Button";
import { GoPersonAdd } from "react-icons/go";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {useNavigate } from "react-router-dom";

const MessengerNavbar = () => {

    const navigate = useNavigate();
  return (
    <div className="messenger-nav-container">
            <div className="messenger-navbar">
              <Button
                onClick={() => {
                  navigate("search");
                }}
                className="add-icon"
                text={<GoPersonAdd size={25} data-tooltip-id="adduser" />}
              />
              <Button
                onClick={() => {
                  navigate("message");
                }}
                className="dm-icon"
                text={
                  <BiSolidCommentAdd
                    size={25}
                    data-tooltip-id="directmessage"
                  />
                }
              />
              <Button
                onClick={() => {
                  navigate("channels");
                }}
                className="channels-icon"
                text={
                  <AiOutlineUsergroupAdd size={25} data-tooltip-id="channels" />
                }
              />
            </div>
          </div>
  )
}

export default MessengerNavbar
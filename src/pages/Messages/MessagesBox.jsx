import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import Input from "components/Input";
import Button from 'components/Button';
import { BiSolidSend } from "react-icons/bi";

const MessagesBox = () => {
  return (
    <div className="message-box">
      <div className="chatname">
        <HiOutlineUserCircle size={35} />
        <h2>Jane Doe</h2>
      </div>
      <div className="conversation-box">conversation</div>
      <div className="input-message-container">
        <div>
          <Input type="text" className="message-input" 
          placeholder="Start typing your message..."/>
          <Button text={<BiSolidSend  size={50}/>} className="send-btn"/>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;

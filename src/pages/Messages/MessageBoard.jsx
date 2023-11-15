import React from "react";
import NavbarExtension from "components/NavbarExtension";
import  MessageBox  from "./MessagesBox";

const MessageBoard = () => {
  return (
    <div className="message-board">
      <NavbarExtension />
      <MessageBox />
    </div>
  );
};

export default MessageBoard;

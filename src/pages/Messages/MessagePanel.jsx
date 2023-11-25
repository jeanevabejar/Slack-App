import React from "react";
import NavbarExtension from "Components/NavbarExtension";
import MessageBox from "./MessageBox";



const MessagePanel = () => {


  return (
    <>
      <div className="message-panel">
        <NavbarExtension />
        <MessageBox />
      </div>
    </>
  );
};

export default MessagePanel;

import React from "react";
import NavbarExtension from "components/NavbarExtension";
import MessageBox from "./MessageBox";
import { useLoaderData } from "react-router";


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

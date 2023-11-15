import React from "react";
import { Tooltip } from "react-tooltip";

const TooltipContainer = () => {
const style = {
  backgroundColor:"white",
  borderRadius:"10px",
  color:"#1f3b2f",
  zIndex: "10"
}


  return (
    <>
      <Tooltip
        id="home"
        place="right"
        content="Home"
        style={style}
      />
      <Tooltip
        id="messenger"
        place="right"
        content="Messenger"
        style={style}
      />
      <Tooltip
        id="user"
        place="right"
        content="User Settings"
        style={style}
      />
      <Tooltip
        id="adduser"
        place="top"
        content="Add Friends"
        style={style}
      />
      <Tooltip
        id="directmessage"
        place="top"
        content="Direct Message"
        style={style}
      />
      <Tooltip
        id="channels"
        place="top"
        content="Channels"
        style={style}
      />
    </>
  );
};

export default TooltipContainer;

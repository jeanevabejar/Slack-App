import React from "react";
import { Tooltip } from "react-tooltip";

const TooltipContainer = () => {
const style = {
  backgroundColor:"#495d54",
  borderRadius:"10px"
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
    </>
  );
};

export default TooltipContainer;

import React from "react";
import { Tooltip } from "react-tooltip";

const TooltipContainer = () => {
  return (
    <>
      <Tooltip
        id="home"
        place="right"
        content="Home"
        style={{ backgroundColor: "#495d54" }}
      />
      <Tooltip
        id="messenger"
        place="right"
        content="Messenger"
        style={{ backgroundColor: "#495d54" }}
      />
      <Tooltip
        id="user"
        place="right"
        content="User Settings"
        style={{ backgroundColor: "#495d54" }}
      />
    </>
  );
};

export default TooltipContainer;

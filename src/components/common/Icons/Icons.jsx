import React from "react";
import { NavbarIcon, Span } from "./IconStyles";
import { GroupIcon } from "./IconStyles";
const Icon = ({ count, ...rest }) => {
  return (
    <NavbarIcon>
      <GroupIcon  {...rest} />
      {count > 0 && <Span>{count}</Span>}
    </NavbarIcon>
  );
};

export default Icon;

import React from "react";
import { ReactComponent as LogoutIcon } from "../../assets/icons/header/logout.svg";
import ActionBtn from "./ActionBtn";

const LogoutBtn = () => {
  return (
    <ActionBtn>
      <LogoutIcon />
    </ActionBtn>
  );
};

export default LogoutBtn;

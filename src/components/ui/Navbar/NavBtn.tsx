import React, { FC } from "react";
import styles from "../../../sass/Navbar.module.scss";

interface INavBtn {
  label: string;
  img: JSX.Element;
}

const NavBtn: FC<INavBtn> = ({ img, label }) => {
  return (
    <button className={styles.NavbarBtnsItem}>
      <span>{label}</span>
      {img}
    </button>
  );
};

export default NavBtn;

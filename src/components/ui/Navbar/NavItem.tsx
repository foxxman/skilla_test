import React, { FC } from "react";
import styles from "../../../sass/Navbar.module.scss";

interface NavItemProps {
  label: string;
  img: JSX.Element;
  isActive: boolean;
}

const NavItem: FC<NavItemProps> = ({ label, img, isActive }) => {
  return (
    <li
      className={`${styles.NavbarItem} ${
        isActive ? styles.NavbarItemActive : ""
      }`}
    >
      <a href="#">
        {img}
        <span>{label}</span>
      </a>
    </li>
  );
};

export default NavItem;

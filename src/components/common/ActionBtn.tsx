import React, { FC } from "react";
import styles from "../../sass/App.module.scss";

interface ActionBtnProps {
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  styleLine?: string;
}

const ActionBtn: FC<ActionBtnProps> = ({
  clickHandler,
  styleLine,
  children,
}) => {
  return (
    <button
      onClick={(e) => (clickHandler ? clickHandler(e) : null)}
      className={`${styles.ActionBtn} ${styleLine || ""}`}
    >
      {children}
    </button>
  );
};

export default ActionBtn;

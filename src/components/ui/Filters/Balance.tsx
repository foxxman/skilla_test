import React from "react";
import styles from "../../../sass/Filters.module.scss";
import { ReactComponent as PlusIcon } from "../../../assets/icons/buttons/plus_circle.svg";
import ActionBtn from "../../common/ActionBtn";

const Balance = () => {
  return (
    <div className={styles.Balance}>
      <p>
        Баланс: <span>272 ₽</span>
      </p>
      <ActionBtn>
        <PlusIcon />
      </ActionBtn>
    </div>
  );
};

export default Balance;

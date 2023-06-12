import React, { FC } from "react";
import styles from "../../../../sass/Calls.module.scss";

interface CallOriginProps {
  source: string;
}

const CallOrigin: FC<CallOriginProps> = ({ source }) => {
  return (
    <div className={styles.CallsRowCell}>
      <p>{source || "Неизвестен"}</p>
    </div>
  );
};

export default CallOrigin;

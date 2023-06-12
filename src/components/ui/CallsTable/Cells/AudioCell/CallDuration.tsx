import React, { FC } from "react";
import styles from "../../../../../sass/Calls.module.scss";
import toNormalFormat from "../../../../../utils/formatTime";

interface DurationCellProps {
  duration: number;
}

const CallDuration: FC<DurationCellProps> = ({ duration }) => {
  return (
    <div className={styles.CallsRowCell}>
      <p>{toNormalFormat(duration)}</p>
    </div>
  );
};

export default CallDuration;

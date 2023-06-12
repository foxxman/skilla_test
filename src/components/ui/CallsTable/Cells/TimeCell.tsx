import React, { FC } from "react";
import styles from "../../../../sass/Calls.module.scss";

interface TimeCellProps {
  date: Date;
}

const TimeCell: FC<TimeCellProps> = ({ date }) => {
  const call_date = new Date(date);

  const minutes =
    String(call_date.getMinutes()).length === 1
      ? "0" + String(call_date.getMinutes())
      : String(call_date.getMinutes());
  const hours =
    String(call_date.getHours()).length === 1
      ? "0" + String(call_date.getHours())
      : String(call_date.getHours());

  return (
    <div className={styles.CallsRowCell}>
      <p>{`${hours}:${minutes}`}</p>
    </div>
  );
};

export default TimeCell;

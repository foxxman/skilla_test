import React, { FC } from "react";
import styles from "../../../../sass/Calls.module.scss";

interface WorkerCellProps {
  avatar: string;
}

const WorkerCell: FC<WorkerCellProps> = ({ avatar }) => {
  return (
    <div className={styles.CallsRowCell}>
      <img className={styles.CallsRowCellAvatar} src={avatar} alt="avatar" />
    </div>
  );
};

export default WorkerCell;

import React, { FC } from "react";
import styles from "../../../sass/Heaader.module.scss";

export enum PROGRESS_COLORS {
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
}

interface IProgressBlock {
  label: string;
  labelProgress: string;
  lineProgress: number;
  color: PROGRESS_COLORS;
}

const ProgressBlock: FC<IProgressBlock> = ({
  label,
  labelProgress,
  lineProgress,
  color,
}) => {
  const getStyles = (color: PROGRESS_COLORS) => {
    let styleLine = `${styles.ProgressBlock} `;

    switch (color) {
      case PROGRESS_COLORS.SUCCESS:
        break;
      case PROGRESS_COLORS.WARNING:
        styleLine += styles.ProgressWarning;
        break;
      case PROGRESS_COLORS.DANGER:
        styleLine += styles.ProgressDanger;
        break;
    }

    return styleLine;
  };

  return (
    <div className={getStyles(color)}>
      <p>
        {label} <span>{labelProgress}</span>
      </p>
      <div className={styles.ProgressBlockBar}>
        <div
          style={{ width: `${lineProgress}%` }}
          className={styles.ProgressBlockBarLine}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBlock;

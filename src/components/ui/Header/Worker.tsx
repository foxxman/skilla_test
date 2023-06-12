import React, { FC } from "react";
import { IWorker } from "../../../mockData/mockData";
import styles from "../../../sass/Heaader.module.scss";
// import { ReactComponent as LogoutIcon } from "../../../assets/icons/header/logout.svg";
import LogoutBtn from "../../common/LogoutBtn";

interface WorkerProps {
  worker: IWorker;
}
const Worker: FC<WorkerProps> = ({ worker }) => {
  return (
    <li className={styles.WrokersListItem}>
      <img src={worker.avatar} alt="avatar" />
      <span>{worker.name}</span>
      <LogoutBtn />
    </li>
  );
};

export default Worker;

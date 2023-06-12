import React, { FC } from "react";
import { IWorkers } from "../../../mockData/mockData";
import Worker from "./Worker";
import styles from '../../../sass/Heaader.module.scss'

interface WorkersListProps {
  workersList: IWorkers;
}

const WorkersList: FC<WorkersListProps> = ({ workersList }) => {
  return (
    <ul className={styles.WrokersList}>
      <h4>{workersList.title}</h4>
      {workersList.users.map((w) => (
        <Worker key={w.id} worker={w} />
      ))}
    </ul>
  );
};

export default WorkersList;

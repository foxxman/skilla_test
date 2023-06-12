import React, { useState } from "react";
import styles from "../../../sass/Calls.module.scss";
import appStyles from "../../../sass/App.module.scss";
import { useSelector } from "react-redux";
import { getCallsList } from "../../../store/reducers/callsReducer";
import CallsRow from "./CallsRow";

const CallsTable = () => {
  const [activeRowId, setActiveRowId] = useState<number | null>(null);

  const calls = useSelector(getCallsList());

  return (
    <div className={appStyles.Container}>
      <div className={styles.Calls}>
        <div className={styles.CallsGrid}>
          {/* TABLE HEAD */}
          <div className={styles.CallsRow + " " + styles.CallsRowHeader}>
            <div className={styles.CallsRowCell}>
              <p></p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Тип</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Время</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Сотрудник</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Звонок</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Источник</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Оценка</p>
            </div>
            <div className={styles.CallsRowCell}>
              <p>Длительность</p>
            </div>
          </div>
          {/* ./TABLE HEAD\. */}
        </div>
        {calls.map((call) => (
          <CallsRow
            activeRowId={activeRowId}
            setActiveRowId={setActiveRowId}
            key={call.id}
            call={call}
          />
        ))}
      </div>
      ;
    </div>
  );
};

export default CallsTable;

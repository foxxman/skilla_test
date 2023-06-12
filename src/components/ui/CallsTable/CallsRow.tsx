import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ICall } from "../../../types/calls";
import styles from "../../../sass/Calls.module.scss";
import TypeCell from "./Cells/TypeCell";
import TimeCell from "./Cells/TimeCell";
import WorkerCell from "./Cells/WorkerCell";
import PhoneNumberCell from "./Cells/PhoneNumberCell";
import CallOrigin from "./Cells/CallOrigin";
import { useSelector } from "react-redux";
import {
  getRecordId,
  getRecordIsPlaying,
} from "../../../store/reducers/recordReducer";
import AudioCell from "./Cells/AudioCell";

interface CallsRowProps {
  call: ICall;
  activeRowId: number | null;
  setActiveRowId: Dispatch<SetStateAction<number | null>>;
}

const CallsRow: FC<CallsRowProps> = ({ call, activeRowId, setActiveRowId }) => {
  // const [isMouseEnter, setIsMouseEnter] = useState(false);
  // const isPlay = useSelector(getRecordIsPlaying());
  const currentRecordId = useSelector(getRecordId());

  return (
    <div
      className={styles.CallsRow}
      onMouseEnter={() => setActiveRowId(call.id)}
      onMouseLeave={() => setActiveRowId(null)}
    >
      {/* <p>Галочка</p> */}
      <div className={styles.CallsRowCell}></div>
      {/*  входящий или исходящий */}
      <TypeCell type={call.in_out} />
      {/* во сколько поступил звонок */}
      <TimeCell date={call.date} />
      {/* аватарка оператора */}
      <WorkerCell avatar={call.person_avatar} />
      {/*  с какого телефона звонок */}
      <PhoneNumberCell phone={call.from_number} />
      {/* кто звонил */}
      <CallOrigin source={call.source} />
      {/* оценка звонка */}
      <div className={styles.CallsRowCell}></div>
      {/* плеер */}
      <AudioCell
        activeRowId={activeRowId}
        callId={call.id}
        record={call.record}
        partnership_id={call.partnership_id}
        duration={call.time}
        currentRecordId={currentRecordId}
      />
    </div>
  );
};

export default CallsRow;

import React, { FC } from "react";
import CallRecord from "./CallRecord";
import CallDuration from "./CallDuration";
import { useSelector } from "react-redux";
import { getRecordCtx } from "../../../../../store/reducers/recordReducer";

interface AudioCellProps {
  duration: number;
  record: string;
  partnership_id: string;
  callId: number;
  currentRecordId: number | null;
  activeRowId: number | null;
}

const AudioCell: FC<AudioCellProps> = ({
  callId,
  record,
  partnership_id,
  duration,
  currentRecordId,
  activeRowId,
}) => {
  // if isn't null - some record loaded
  const audioCtx = useSelector(getRecordCtx());

  return activeRowId === callId && duration !== 0 ? (
    audioCtx && currentRecordId !== callId ? (
      // если загружена запись с другой строки - не отображать новую при наведении на нее
      <CallDuration duration={duration} />
    ) : (
      // если не загружена другая запись - можно и отобразить плеер при наведении на строку
      <CallRecord
        duration={duration}
        callId={callId}
        record={record}
        partnership_id={partnership_id}
      />
    )
  ) : audioCtx && currentRecordId === callId ? (
    //если загружена запись из данной строки - отображать плеер всегда
    <CallRecord
      duration={duration}
      callId={callId}
      record={record}
      partnership_id={partnership_id}
    />
  ) : (
    //запись этой строки не загружена, курсор не наведён
    <CallDuration duration={duration} />
  );
};

export default AudioCell;

import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../../../../../sass/Calls.module.scss";

import { ReactComponent as PlayIcon } from "../../../../../assets/icons/audio/play.svg";
import { ReactComponent as PauseIcon } from "../../../../../assets/icons/audio/pause.svg";
import { ReactComponent as DownloadIcon } from "../../../../../assets/icons/audio/download.svg";
import { ReactComponent as DropIcon } from "../../../../../assets/icons/audio/close.svg";

import toNormalFormat from "../../../../../utils/formatTime";

import { useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import {
  downloadRecord,
  dropRecordData,
  getRecordCtx,
  getRecordDuration,
  getRecordId,
  getRecordIsLoading,
  getRecordIsPlaying,
  getRecordOffset,
  increaseTime,
  loadRecord,
  playRecord,
  recordRewind,
  stopRecord,
} from "../../../../../store/reducers/recordReducer";

import ActionBtn from "../../../../common/ActionBtn";
import Loader from "../../../../common/Loader";

interface CallRecordProps {
  record: string;
  partnership_id: string;
  callId: number;
  duration: number;
}

const CallRecord: FC<CallRecordProps> = ({
  callId,
  record,
  partnership_id,
  duration,
}) => {
  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const recordId = useSelector(getRecordId());
  const isLoading = useSelector(getRecordIsLoading());
  const audioDuration = useSelector(getRecordDuration());
  const currentTime = useSelector(getRecordOffset());
  const isPlay = useSelector(getRecordIsPlaying());
  const audioCtx = useSelector(getRecordCtx());

  const timeRef = useRef<HTMLDivElement | null>(null);
  const timeLineRef = useRef<HTMLDivElement | null>(null);
  const timeProgressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      clearTimer();
      dispatch(dropRecordData());
    };
  }, []);

  useEffect(() => {
    if (!isPlay) {
      clearTimer();
    }
  }, [isPlay]);

  // if audioCtx is not null - record loaded, we can play it
  useEffect(() => {
    if (audioCtx) {
      newTimer();
      dispatch(playRecord());
    }
  }, [audioCtx]);

  const newTimer = () => {
    setTimer(
      setInterval(() => {
        dispatch(increaseTime());
      }, 1000)
    );
  };
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const playPause = () => {
    if (!recordId) dispatch(loadRecord(record, partnership_id, callId));
    else if (!isPlay) {
      // console.log(isPlay, recordId);
      newTimer();
      dispatch(playRecord());
    } else {
      // console.log(isPlay, recordId);

      clearTimer();
      dispatch(stopRecord());
    }
  };

  const mouseMoveHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    duration: number
  ) => {
    if (timeRef.current && timeLineRef.current && timeProgressRef.current) {
      //  time text
      const timeProgress =
        (e.clientX - timeLineRef.current.offsetLeft) /
        timeLineRef.current.offsetWidth;
      const currentTime = toNormalFormat(Math.floor(duration * timeProgress));
      timeRef.current.innerHTML = currentTime;
      timeRef.current.style.display = "block";

      // position
      timeRef.current.style.left = `${
        e.clientX - timeRef.current.offsetWidth / 2
      }px`;
      timeRef.current.style.top = `${
        timeLineRef.current.offsetTop - timeRef.current.offsetHeight - 2
      }px`;
    }
  };

  const mouseLeaveHandler = () => {
    if (timeRef.current) timeRef.current.style.display = "none";
  };

  const recordLineClickHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    duration: number
  ) => {
    if (timeRef.current && timeLineRef.current && timeProgressRef.current) {
      //  time text
      const timeProgress =
        (e.clientX - timeLineRef.current.offsetLeft) /
        timeLineRef.current.offsetWidth;
      const currentTime = Math.floor(duration * timeProgress);

      clearTimer();

      dispatch(stopRecord());
      dispatch(recordRewind(currentTime));
      dispatch(playRecord());

      newTimer();
    }
  };

  const downloadHandler = () => {
    dispatch(downloadRecord(record, partnership_id, callId));
  };

  const dropAudioHandler = () => {
    dispatch(stopRecord());
    clearTimer();
    dispatch(dropRecordData());
  };

  return (
    <div className={styles.CallsRowCell}>
      <Loader show={isLoading} />
      <div className={styles.Record}>
        {/* DURATION */}
        <div className={styles.RecordDuration}>
          {isPlay || audioDuration - currentTime !== 0
            ? toNormalFormat(audioDuration - currentTime)
            : toNormalFormat(duration)}
        </div>
        {/* PLAY BUTTON */}
        <button className={styles.RecordControl} onClick={playPause}>
          {!isPlay ? <PlayIcon /> : <PauseIcon />}
        </button>
        {/* RECORD PROGRESS */}

        <div
          className={styles.RecordLine}
          ref={timeLineRef}
          onMouseMove={(e) => mouseMoveHandler(e, audioDuration)}
          onMouseLeave={mouseLeaveHandler}
          onClick={(e) => recordLineClickHandler(e, audioDuration)}
        >
          <div
            ref={timeProgressRef}
            style={{
              width: `${audioCtx ? (currentTime * 100) / audioDuration : 0}%`,
            }}
            className={styles.RecordLineProgress}
          ></div>
        </div>

        <ActionBtn clickHandler={downloadHandler}>
          <DownloadIcon />
        </ActionBtn>

        <ActionBtn clickHandler={dropAudioHandler}>
          <DropIcon />
        </ActionBtn>

        {/* TIME BLOCK */}
        <div className={styles.RecordTime} ref={timeRef}></div>
      </div>
    </div>
  );
};

export default CallRecord;

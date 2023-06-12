import { RootState, useAppDispatch } from "./../index";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import recordsService from "../../services/record.service";
import { msToSec } from "../../utils/formatTime";
import downloadAudio from "../../utils/downloadAudio";

interface IRecordState {
  isLoading: boolean;
  isPlaying: boolean;
  error: null | string;
  buffer: AudioBuffer | null;
  audioCtx: AudioContext | null;
  sourceNode: AudioBufferSourceNode | null;
  recordDuration: number;
  startedAt: number;
  offsetTime: number;
  recordId: number | null;
}

const initialState: IRecordState = {
  isLoading: false,
  isPlaying: false,
  error: null,
  buffer: null,
  audioCtx: null,
  sourceNode: null,
  recordDuration: 0,
  startedAt: 0,
  offsetTime: 0,
  recordId: null,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    dropData: (state) => {
      state.isLoading = false;
      state.isPlaying = false;
      state.error = null;
      state.buffer = null;
      state.audioCtx = null;
      state.sourceNode = null;
      state.offsetTime = 0;
      state.recordDuration = 0;
      state.startedAt = 0;
      state.recordId = null;
    },
    recordRequested: (state) => {
      state.isLoading = true;
    },
    recordRecived: (
      state,
      action: {
        payload: { data: AudioBuffer; recordId: number };
        type: string;
      }
    ) => {
      state.recordId = action.payload.recordId;
      state.buffer = action.payload.data;
      state.recordDuration = Math.floor(state.buffer.duration);
      state.isLoading = false;
    },
    recordCtxInit: (
      state,
      action: {
        payload: AudioContext;
        type: string;
      }
    ) => {
      state.audioCtx = action.payload;
    },
    recordRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    recordPlayFailed: (state, action) => {
      state.error = action.payload;
    },
    recordSourceNodeInit: (
      state,
      action: {
        payload: AudioBufferSourceNode;
        type: string;
      }
    ) => {
      state.sourceNode = action.payload;
    },
    recordPlay: (state) => {
      state.isPlaying = true;
      state.startedAt = msToSec(Date.now());
    },
    recordStop: (state) => {
      state.isPlaying = false;
      state.sourceNode?.stop();
    },
    recordIncreaseOffset: (state) => {
      state.offsetTime += 1;
    },
    recordSetOffset: (
      state,
      action: {
        payload: number;
        type: string;
      }
    ) => {
      state.offsetTime = action.payload;
    },
  },
});

const { reducer: recordReducer, actions } = recordSlice;
const {
  recordSourceNodeInit,
  recordCtxInit,
  recordRequested,
  recordRequestFailed,
  recordRecived,
  recordPlayFailed,
  recordStop,
  recordPlay,
  dropData,
  recordIncreaseOffset,
  recordSetOffset,
} = actions;

// ACTION CREATORS
export const loadRecord =
  (record: string, partnership_id: string, callId: number) =>
  async (dispatch: Dispatch) => {
    dispatch(recordRequested());
    try {
      const audioData = await recordsService.getRecord(record, partnership_id);

      const audioCtx = new AudioContext();

      audioCtx.decodeAudioData(audioData, (data) => {
        dispatch(recordRecived({ data, recordId: callId }));
        dispatch(recordCtxInit(audioCtx));
      });
    } catch (error: any) {
      dispatch(recordRequestFailed(error.message));
    }
  };

export const playRecord =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const audioCtx = getState().record.audioCtx;
    const audioBuffer = getState().record.buffer;
    const offset = getState().record.offsetTime;

    if (audioCtx && audioBuffer) {
      // console.log(audioCtx, audioBuffer);
      // console.log(offset);

      const newSourceNode = audioCtx.createBufferSource();
      // создать новый буфер и запустить его
      newSourceNode.buffer = audioBuffer;
      newSourceNode.connect(audioCtx.destination);
      newSourceNode.start(0, offset);

      dispatch(recordPlay());
      dispatch(recordSourceNodeInit(newSourceNode));
    } else {
      dispatch(recordPlayFailed("Cant play"));
    }
  };

export const dropRecordData = () => (dispatch: Dispatch) => {
  dispatch(dropData());
};

export const stopRecord = () => (dispatch: Dispatch) => dispatch(recordStop());

export const increaseTime =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    if (getState().record.offsetTime >= getState().record.recordDuration) {
      dispatch(recordStop());
      dispatch(recordSetOffset(getState().record.recordDuration));
    } else {
      dispatch(recordIncreaseOffset());
    }
  };

export const recordRewind = (offset: number) => (dispatch: Dispatch) => {
  dispatch(recordSetOffset(offset));
};

// download to PC
export const downloadRecord =
  (record: string, partnership_id: string, callId: number) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    if (callId !== getState().record.recordId) {
      try {
        const audioData = await recordsService.getRecord(
          record,
          partnership_id
        );

        const audioCtx = new AudioContext();

        audioCtx.decodeAudioData(audioData, (audioBuffer) => {
          downloadAudio(audioBuffer);
        });
      } catch (error: any) {
        dispatch(recordRequestFailed(error.message));
      }
    } else {
      const audioBuffer = getState().record.buffer;
      if (audioBuffer) downloadAudio(audioBuffer);
    }
  };

// GETTERS
export const getRecordIsLoading = () => (state: RootState) =>
  state.record.isLoading;
export const getRecordDuration = () => (state: RootState) =>
  state.record.recordDuration;
export const getRecordIsPlaying = () => (state: RootState) =>
  state.record.isPlaying;
export const getRecordOffset = () => (state: RootState) =>
  state.record.offsetTime;
export const getRecordId = () => (state: RootState) => state.record.recordId;
export const getRecordCtx = () => (state: RootState) => state.record.audioCtx;

export default recordReducer;

import { RootState } from "./../index";
import { ICall } from "./../../types/calls";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import callsService from "../../services/calls.service";

interface ICallsState {
  isLoading: boolean;
  error: null | string;
  entities: ICall[];
}

const initialState: ICallsState = {
  isLoading: false,
  error: null,
  entities: [],
};

const callsSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    callsRequested: (state) => {
      state.isLoading = true;
    },
    callsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    callsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: callsReducer, actions } = callsSlice;
const { callsRequested, callsRecived, callsRequestFailed } = actions;

export const loadLastCallsList =
  (limit: number) => async (dispatch: Dispatch) => {
    dispatch(callsRequested());

    try {
      const data = await callsService.getLastCalls(limit);

      dispatch(callsRecived(data.content.results));
    } catch (error: any) {
      dispatch(callsRequestFailed(error.message));
    }
  };

export const loadFilteredCallsList =
  (limit: number, in_out: string, dates: string) =>
  async (dispatch: Dispatch) => {
    dispatch(callsRequested());
    try {
      const data = await callsService.getFilteredCalls(limit, in_out, dates);
      dispatch(callsRecived(data.content.results));
    } catch (error: any) {
      dispatch(callsRequestFailed(error.message));
    }
  };

export const getCallsList = () => (state: RootState) => state.calls.entities;

export default callsReducer;

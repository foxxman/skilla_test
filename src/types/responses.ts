import { ICall } from "./calls";

export interface ICallResponse {
  total_rows: string;
  results: ICall[];
}

export interface IResponse<T> {
  content: T;
}

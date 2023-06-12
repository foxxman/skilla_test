import httpService from "./http.service";
import { ICallResponse, IResponse } from "../types/responses";

const callsEndPoint = "getList";

const callsService = {
  getLastCalls: async (limit: number) => {
    const response = await httpService.post<IResponse<ICallResponse>>(
      callsEndPoint + `?sort_by=date&limit=${String(limit)}`
    );
    return response.data;
  },

  getFilteredCalls: async (limit: number, type: string, dates: string) => {
    const response = await httpService.post<IResponse<ICallResponse>>(
      callsEndPoint +
        `?sort_by=date&${
          String(type).trim() ? `&in_out=${String(type).trim()}` : ""
        }&${dates}`
    );

    return response.data;
  },
};

export default callsService;

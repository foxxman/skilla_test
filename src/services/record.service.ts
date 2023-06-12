import axios from "axios";

const recordHttp = axios.create({
  baseURL: "https://api.skilla.ru/mango/getRecord",
});

// добавление токена в запрос
recordHttp.interceptors.request.use(
  async function (config) {
    config.headers.Authorization = `Bearer testtoken`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const recordsService = {
  getRecord: async (record: string, partnership_id: string) => {
    const response = await recordHttp<ArrayBuffer>({
      method: "POST",
      responseType: "arraybuffer",
      params: {
        record,
        partnership_id,
      },
    });

    return response.data;
  },
};

export default recordsService;

import axios from "axios";

const http = axios.create({
  baseURL: "https://api.skilla.ru/mango/",
});

// добавление токена в запрос
http.interceptors.request.use(
  async function (config) {
    config.headers.Authorization = `Bearer testtoken`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// обработка ошибок
http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },

  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;

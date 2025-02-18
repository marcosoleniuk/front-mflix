import axios from "axios";
// import {
//   getUserSessionStorage,
//   removeUserSessionStorage,
// } from "../../context/AuthProvider/utils";

export type SpringPage<T> = {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements?: number;
  empty: boolean;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  timeoutErrorMessage: "O tempo de conexão com o servidor foi excedido.",
});

// api.interceptors.request.use(
//   (config) => {
//     const user = getUserSessionStorage();
//     config.headers.Authorization = user?.token;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (
//       (error.response && error.response.status === 403) ||
//       error.response.status === 401
//     ) {
//       removeUserSessionStorage();
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }
    // if (error.response && error.response.status === 404) {
    //   window.location.href = "/404";
    // }
    // return Promise.reject(error);
//   }
// );
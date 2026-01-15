// import api from "./axios";
// import axios from "axios";

// export const setupInterceptors = (accessToken, login, logout) => {

//   api.interceptors.request.use((config) => {
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   });

//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           const res = await axios.post(
//             "http://127.0.0.1:8000/api/accounts/token/refresh/",
//             {},
//             { withCredentials: true }
//           );

//           login(res.data.access, null);
//           originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

//           return api(originalRequest);
//         } catch (err) {
//           logout();
//           return Promise.reject(err);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// };

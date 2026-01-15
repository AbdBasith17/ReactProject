import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth/",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const skipRefreshEndpoints = [
      "/login/",
      "/logout/",
      "/token/refresh/",
      "/register/",
    ];

    if (
      error.response?.status !== 401 ||
      skipRefreshEndpoints.some(url => originalRequest.url.includes(url))
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => api(originalRequest))
        .catch(err => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      await api.post("/token/refresh/");
      processQueue();
      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;

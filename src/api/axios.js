import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  setTimeout(() => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });
    failedQueue = [];
  }, 50);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      const isAuthEndpoint = [
        "auth/login/",
        "auth/token/refresh/",
        "auth/register/",
      ].some((url) => originalRequest.url.includes(url));

      // If the login or refresh call itself fails, don't retry
      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api.post("auth/token/refresh/")
          .then(() => {
            processQueue();
            resolve(api(originalRequest));
          })
          .catch((refreshError) => {
            processQueue(refreshError);
            // GENTLE FIX: We no longer force window.location.href = "/signin"
            // This allows guest users to stay on public pages like Home.
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
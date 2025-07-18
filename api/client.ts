import axios from "axios";
import * as SecureStore from "expo-secure-store";

// PARA OBTER O ENDEREÇO IPV4
// Abra o terminal e execute o comando: `ifconfig` (Linux/Mac) ou `ipconfig` (Windows).
// Procure pela interface de rede que você está usando
// (geralmente `eth0`, `en0`, ou `wlan0` para conexões com fio ou sem fio, respectivamente).
// O endereço IPv4 será algo como `192.168.1.179`.

const api = axios.create({
  baseURL: "http://192.168.1.179:8000", // COLOQUE SEU ENDEREÇO IPV4
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        const response = await api.post("/auth/refresh", {
          refreshToken,
        });

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        await SecureStore.setItemAsync("token", newToken);
        await SecureStore.setItemAsync("refresh_token", newRefreshToken);

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

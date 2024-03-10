/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAtuh";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // Add a request intercept
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    // Add a response intercept
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const resonse = await api.post("/auth/refresh-token", {
              refreshToken,
            });

            const { token } = resonse.data;
            `New token: ${token}`;
            setAuth({ ...auth, authToken: token });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { api };
};

export default useAxios;

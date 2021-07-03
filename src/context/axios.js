import axios from "axios";
import useAxios from "axios-hooks";
import { useAuth } from "./auth";

axios.interceptors.request.use(
  async (config) => {
    const { auth } = useAuth();
    const token = auth.getToken();

    if (token) {
      config.headers = {
        token,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { auth } = useAuth();
      auth.logout();
      window.location.replace("/sign-in");
      alert("用户信息已过期，请重新登陆");
    } else {
      return Promise.reject(error);
    }
  }
);

export { axios, useAxios };

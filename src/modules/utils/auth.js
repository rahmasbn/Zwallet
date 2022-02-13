import axios from "axios";

export const register = (body) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/auth/register";
//   console.log("url", url);
  return axios.post(url, body);
};

export const login = (body) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/auth/login";
  return axios.post(url, body);
};

export const logout = (token) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/auth/logout";
  return axios.get(url, {
    headers: {
      "Authorization" : `Bearer ${token}`
    },
  });
};

export const forgotPassword = (body) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/auth/forgot-password";
  return axios.post(url, body);
}

export const resetPassword = (body) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/auth/reset-password";
  return axios.patch(url, body);
}
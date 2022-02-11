import axios from "axios";

export const transactionHistory = (page, limit, filter, token) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/transaction/history?page=${page}&limit=${limit}&filter=${filter}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const topUp = (body, token) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/transaction/top-up";
  return axios.post(url, body, {
    headers: {
      "Authorization" : `Bearer ${token}`
    },
  });
};

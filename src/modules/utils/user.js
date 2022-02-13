import axios from "axios";

export const profile = (token, id) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/user/profile/" + id;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPhoneNumber = (body, token, id) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/user/profile/" + id;
  console.log(body);
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePin = (body, token, id) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/user/pin/" + id;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPassword = (body, token, id) => {
  const url = process.env.NEXT_PUBLIC_HOST + "/user/password/" + id;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsers = (filter, token) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/user${filter}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkPin = (pin, token) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/user/pin?pin=` + pin;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateImage = (id, body, token) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/user/image/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const updateName = (id, body, token) => {
  const url = `${process.env.NEXT_PUBLIC_HOST}/user/profile/${id}`;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}



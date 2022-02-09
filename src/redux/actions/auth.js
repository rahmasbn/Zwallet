import { ACTION_STRING } from "src/redux/actions/actionString";
import { login } from "src/modules/utils/auth";

export const loginAction = (body) => {
  return {
    type: ACTION_STRING.authLogin,
    payload: login(body),
  };
};

export const logoutAction = () => {
  return {
    type: ACTION_STRING.authLogout,
  };
};

// export const updatePIN = (pin) => {
//   return {
//     type: ACTION_STRING.userPin,
//     payload: pin,
//   };
// };

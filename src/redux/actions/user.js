import { ACTION_STRING } from "src/redux/actions/actionString";
import { profile } from "src/modules/utils/user";

export const getProfileAction = (token, id) => {
  return {
    type: ACTION_STRING.profileUser,
    payload: profile(token, id),
  };
};

export const updateUserPhoto = (image) => {
  return {
    type: ACTION_STRING.userPhoto,
    payload: image,
  };
};

export const updatePhoneNumber = (noTelp) => {
  return {
    type: ACTION_STRING.userNumber,
    payload: noTelp,
  };
};



import { ACTION_STRING } from "src/redux/actions/actionString";

const initialState = {
  authUser: {
    token: "",
    id: "",
    pin: "",
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  const { authLogin, userPin, pending, fulfilled, rejected } = ACTION_STRING;
  switch (action.type) {
    case authLogin + pending:
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case authLogin + fulfilled:
      const data = action.payload.data;
      const authUser = {
        ...prevState,
        token: data.data.token,
        id: data.data.id,
        pin: data.data.pin,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        authUser,
      };

    case authLogin + rejected:
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    // case userPin:
    //   const newPin = action.payload;
    //   console;
    //   return {
    //     ...prevState,
    //     authUser: {
    //       ...prevState.authUser,
    //       pin: newPin,
    //     },
    //   };

    default:
      return prevState;
  }
};

export default authReducer;

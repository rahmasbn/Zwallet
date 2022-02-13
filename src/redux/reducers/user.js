import { ACTION_STRING } from "src/redux/actions/actionString";

const initialState = {
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    noTelp: null,
    balance: 0,
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const userReducer = (prevState = initialState, action) => {
  const { userPhoto, userBalance ,userNumber, profileUser, pending, fulfilled, rejected } =
    ACTION_STRING;
  switch (action.type) {
    case profileUser + pending:
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case profileUser + fulfilled:
      const data = action.payload.data;
      const userData = {
        ...prevState,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        image: data.data.image,
        noTelp: data.data.noTelp,
        balance: data.data.balance,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    case profileUser + rejected:
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    case userPhoto:
      const newPhoto = action.payload;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          image: newPhoto,
        },
      };

      case userNumber:
      const newData = action.payload;
      console
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          noTelp: newData,
        },
      };

      case userBalance:
        const newBalance = action.payload;
        console
        return {
          ...prevState,
          userData: {
            ...prevState.userData,
            balance: newBalance,
          },
        };

    default:
      return prevState;
  }
};

export default userReducer;

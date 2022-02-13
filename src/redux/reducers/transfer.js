import { ACTION_STRING } from "src/redux/actions/actionString";

const initialState = {
  dataTransfer: {},
};

const transferReducer = (prevState = initialState, action) => {
  const { dataTransfer } = ACTION_STRING;
  switch (action.type) {
    case dataTransfer:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return prevState;
  }
};

export default transferReducer;

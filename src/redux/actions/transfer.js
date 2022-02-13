import { ACTION_STRING } from "src/redux/actions/actionString";

export const detailTransfer = (data) => {
  return {
    type: ACTION_STRING.dataTransfer,
    payload: { data },
  };
};

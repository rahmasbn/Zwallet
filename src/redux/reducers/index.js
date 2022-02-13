import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import { ACTION_STRING } from "src/redux/actions/actionString";
import authReducer from "src/redux/reducers/auth";
import userReducer from "src/redux/reducers/user";
import transferReducer from "src/redux/reducers/transfer";
import chartReducer from "src/redux/reducers/chart";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  transfer: transferReducer,
  // chart: chartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    storage.removeItem('persist:root');

    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
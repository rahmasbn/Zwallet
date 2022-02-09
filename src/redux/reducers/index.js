import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import { ACTION_STRING } from "src/redux/actions/actionString";
import authReducer from "src/redux/reducers/auth";
import userReducer from "src/redux/reducers/user";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    storage.removeItem('persist:root');

    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
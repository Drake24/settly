import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authenticationApi } from "../services/AuthenticationService";
import { persistReducer } from "redux-persist";
import authenticationSlice from "./authentication/AuthenticationSlice";
import storage from "redux-persist/lib/storage";
import { clientApi } from "../services/ClientService";
import { adminApi } from "../services/AdminService";

// Combines all reducers. This will be debuggable
// in Redux app Store.
const reducers = combineReducers({
  [clientApi.reducerPath]: clientApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  authentication: authenticationSlice,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer: Reducer = (
  state: ReturnType<typeof reducers>,
  action: AnyAction
) => {
  // clear state upon logout
  if (action.type === "authentication/logoutUser") {
    return reducers(undefined, { type: undefined });
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(clientApi.middleware)
      .concat(adminApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

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
  //  clientApi: clientApi.reducer,
  // adminApi: adminApi.reducer
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

// https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
const persistedReducer = persistReducer(persistConfig, rootReducer);

// https://blog.geogo.in/redux-made-easy-with-rtk-query-f676de15535a
export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(clientApi.middleware)
      .concat(adminApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
// The RootState gets the 'root' of all your slice.
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

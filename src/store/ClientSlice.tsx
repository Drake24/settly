import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Client from '../lib/models/ClientModel';
import {RootState} from '../store/store';

// const initialUserState: User = {
// } as User
// A function that accepts an initial state, an object of reducer functions, and a
// "slice name", and automatically generates action creators and action types that
// correspond to the reducers and state.
export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    // user: {} as User,
    // isAuthorized: false,
  },
  reducers: {
  },
})

// export const {saveUserCredentials, logoutUser} = .actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: any) => (dispatch: any) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// !! Use RootState when accessing state as Typescript is very strict.

export const selectAdminClients = (state: RootState): any => state.clientApi

export default clientSlice.reducer

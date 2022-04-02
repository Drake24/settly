import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import User from '../../lib/models/AdminModel'
import {RootState} from '../store'

// const initialUserState: User = {
// } as User
// A function that accepts an initial state, an object of reducer functions, and a
// "slice name", and automatically generates action creators and action types that
// correspond to the reducers and state.
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {} as User,
    isAuthorized: false,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    logoutUser: (state: RootState) => {
      console.log('user has been logged out')
      state.user = {} as User
      state.isAuthorized = false
      //resettableReducer(state, action)
    },
    saveUserCredentials(state: RootState, {payload}: PayloadAction<User>) {
      console.log('action', payload)
      state.user = payload
      state.isAuthorized = true
    },
  },
})

export const {saveUserCredentials, logoutUser} = authenticationSlice.actions

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
export const selectUser = (state: RootState): User => state.authentication.user

export const selectIsAuthorized = (state: RootState): boolean => state.authentication.isAuthorized

export const selectAccessToken = (state: RootState): string => state.authentication.user.accessToken

export const selectUserTodos = (state: RootState): any => state.todoApi

export default authenticationSlice.reducer

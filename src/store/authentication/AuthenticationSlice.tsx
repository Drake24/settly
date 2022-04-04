import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import Admin from '../../lib/models/AdminModel'

// const initialUserState: User = {
// } as User
// A function that accepts an initial state, an object of reducer functions, and a
// "slice name", and automatically generates action creators and action types that
// correspond to the reducers and state.
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {} as Admin,
    isAuthorized: false,
  },
  reducers: {
    logoutUser: (state: RootState) => {
      state.user = {} as Admin
      state.isAuthorized = false
    },
    saveUserCredentials(state: RootState, {payload}: PayloadAction<Admin>) {
      state.user = payload
      state.isAuthorized = true
    },
  },
})

export const {saveUserCredentials, logoutUser} = authenticationSlice.actions

export const selectUser = (state: RootState): Admin => state.authentication.user

export const selectIsAuthorized = (state: RootState): boolean => state.authentication.isAuthorized

export const selectAccessToken = (state: RootState): string => state.authentication.user.accessToken

export default authenticationSlice.reducer

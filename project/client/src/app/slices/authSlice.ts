import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
  token: string | null
  isAuth: boolean
}

const initialState: AuthState = {
  token: null,
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuth = true
    },
    logout: (state) => {
      state.token = null
      state.isAuth = false
    }
  },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer

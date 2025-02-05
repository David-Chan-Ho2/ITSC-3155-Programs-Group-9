import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IToken } from '../../types/auth.types'
import { RootState } from '../store'

export interface AuthState {
  access: string | null
  isAuth: boolean
}

const initialState: AuthState = {
  access: null,
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IToken>) => {
      state.access = action.payload.access
      state.isAuth = true
    },
    logout: (state) => {
      state.access = null
      state.isAuth = false
    }
  },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer

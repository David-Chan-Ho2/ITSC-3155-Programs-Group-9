import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
    userId: number
}

const initialState: UserState = {
    userId: 1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
    },
})

export const { setUserId } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

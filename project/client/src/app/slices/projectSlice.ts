import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ProjectState {
    projectId: number
}

const initialState: ProjectState = {
    projectId: 1
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectId: (state, action: PayloadAction<number>) => {
            state.projectId = action.payload
        },
    },
})

export const { setProjectId } = projectSlice.actions

export const selectProject = (state: RootState) => state.project

export default projectSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import profileSlice from './Slices/profileSlice'
import jobsSlice from './Slices/jobsSlice'

export default configureStore({
  reducer: {
    auth:authSlice,
    profile:profileSlice,
    jobs:jobsSlice,
  },
})
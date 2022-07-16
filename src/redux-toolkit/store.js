import { configureStore } from '@reduxjs/toolkit'
import userStateReducer from './userStateSlice'

export const store = configureStore({
  reducer: {
    userstate: userStateReducer  
  },  

})

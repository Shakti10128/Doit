import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from '../../slices/addTaskSlice'

export const store = configureStore({
    reducer:{
        tasks:addTaskReducer
    }
})
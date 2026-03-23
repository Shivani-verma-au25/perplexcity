import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './components/features/auth/auth.sclice'


export const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        // chat: ''
    }
})
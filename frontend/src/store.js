import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './components/features/auth/auth.sclice'
import chatSliceReducer from './components/features/chat/chat.slice'


export const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        chat: chatSliceReducer,
    }
})
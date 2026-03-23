import { createSlice } from "@reduxjs/toolkit";

const initialState ={
        user : null,
        loading : true,
        error : null
    }

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setLoading:(state ,action) =>{
            state.loading = action.payload
        },
        setError:(state,action) =>{
            state.error = action.payload;
        },
        setUser : (state,action)=>{
            console.log("payload",action.payload);
        
            state.user = action.payload
        },
        clearError :(state)=>{
            state.error = null;
        }
    }
})


export const {setLoading,setError,setUser} = authSlice.actions;
export default authSlice.reducer;
import {useDispatch} from 'react-redux'
import { setError, setLoading, setUser } from '../auth.sclice'
import { Getme, Login, Register } from '../service/auth.api'

export const useAuth = () =>{
    const dispatch = useDispatch()
    const handleRegister = async( {email,username,password}) =>{
        try {
            dispatch(setLoading(true))
            dispatch(setError(null)) // clear old errors
            const resp = await Register({email,password,username});
            if(resp.success){
                dispatch(setUser(resp.user))
            };
            return resp;

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration Failed."))
            return null;
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({email,password}) =>{
        try {
            dispatch(setLoading(true));
            dispatch(setError(null)) // clear old errors
            const resp = await Login({email,password})
            if (resp?.success) {
                dispatch((setUser(resp.user || resp.data?.user)))
            }
            return resp;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to login") )
            return null;
        }finally{
            dispatch(setLoading(false));
        }
    }

    const handleGetMe = async () =>{
        try {
            dispatch(setLoading(true));
            dispatch(setError(null)) // clear old errors
            const resp = await Getme();
            if (resp.success) {
                dispatch(setUser(resp.user))
            }
            return resp;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to get data"))
            return null;
        }finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister ,handleLogin,handleGetMe
    }
}
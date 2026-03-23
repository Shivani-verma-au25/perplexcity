import axois from 'axios'


const urlIntance = axois.create({
    baseURL : 'http://localhost:3000',
    withCredentials: true
})  



export async function Register({email,username,password}) {
    const response = await urlIntance.post('/api/auth/register',{email,username,password});
    return response.data;
}

export async function Login({email,password}) {
    const response = await urlIntance.post('/api/auth/login',{email,password});
    return response.data;
}

export async function Getme() {
    const response = await urlIntance.get('/api/auth/get-me');
    return response.data;
}
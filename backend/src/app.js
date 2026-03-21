import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();  

const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());



// importing routes
import authRouter from './routers/auth.router.js'

app.use('/api/auth',authRouter)


export default app;



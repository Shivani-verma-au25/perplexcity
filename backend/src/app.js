import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'

dotenv.config();  

const app = express();



// middleware
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials: true,
        methods: ['GET','POST','PUT','DELETE']
    }
));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(morgan('dev'))



// importing routes
import authRouter from './routers/auth.router.js'
import chatRouter from './routers/chat.router.js'

app.use('/api/auth',authRouter)
app.use('/api/chats',chatRouter)


export default app;



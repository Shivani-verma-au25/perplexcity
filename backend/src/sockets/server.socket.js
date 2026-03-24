import {Server} from 'socket.io'

let io;

export const  initSocket =(httpSever)=> {
    io = new Server(httpSever ,{
        cors:{
            origin :'http://localhost:5174',
            credentials : true,
        }
    });

    console.log("socket io is running");
    
    // user connected
    io.on('connection',(socket) =>{
        console.log("A user connected" , socket.id); // print user with socket id 
        
    })
}


export function getIO(){
    if (!io) {
         throw new Error("Socket io is not initialized.");
    }

    return io;
}
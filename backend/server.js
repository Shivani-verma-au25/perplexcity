import app from "./src/app.js";
import { connectToDb } from "./src/db/databse.js";                          
import http from 'http'
import { initSocket } from "./src/sockets/server.socket.js";
const port = process.env.PORT || 6000;


const httpServer = http.createServer(app);

initSocket(httpServer);


// Connect to the database before starting the server
connectToDb().then(()=>{
        httpServer.listen(3000 ,() => {
        console.log(`Server is running at ${port}`);
    })
}).catch((error)=>{
    console.log("Failed to connect to the database. Server not started.", error);
});




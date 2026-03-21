import app from "./src/app.js";
import { connectToDb } from "./src/db/databse.js";                          

const port = process.env.PORT || 6000;

// Connect to the database before starting the server
connectToDb().then(()=>{
        app.listen(3000 ,() => {
        console.log(`Server is running at ${port}`);
    })
}).catch((error)=>{
    console.log("Failed to connect to the database. Server not started.", error);
});




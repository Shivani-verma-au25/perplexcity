import mongoose from "mongoose";

export const connectToDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DataBase connection done", connectionInstance.connection.host);
    } catch (error) {
        console.log("Error connecting to databse" ,error);
        process.exit(1);
    }
}
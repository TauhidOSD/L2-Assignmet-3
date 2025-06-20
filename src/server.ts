import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from "./app";


dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    console.log('Connect to MongoDb');

    app.listen(port,() => {
        console.log(`Server is running on port ${port}`);
        
    })
    
})
.catch((error)=> {
    console.error('Mongodb connection error',error);
    
})
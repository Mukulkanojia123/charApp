import express from "express";
import userRouter from './routes/user.js'
import dotenv from 'dotenv';
import { connectDB } from "./utlis/feature.js";


dotenv.config({
    path : "./.env"
})


const app = express();
const mongoUri = process.env.MONGO_URI

connectDB(mongoUri)

app.use(express.json());

app.use('/user',userRouter )




app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
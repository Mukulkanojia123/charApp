import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./utlis/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createSingleChats } from "./seeders/chat.js";



import userRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import adminRoute from './routes/admin.js'

dotenv.config({
    path : "./.env"
})


const app = express();
const mongoUri = process.env.MONGO_URI

connectDB(mongoUri)

// createUser(10);
// createGroupChats(10)
// createSingleChats(10)

app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded())

app.use('/user',userRouter )
app.use('/chat', chatRouter )
app.use('/admin', adminRoute )


app.use(errorMiddleware)

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
import express from "express";
import userRouter from './routes/user.js'
import dotenv from 'dotenv';


dotenv.config({
    path : "./.env"
})


const app = express();

app.use(express.json());

app.use('/user',userRouter )




app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})
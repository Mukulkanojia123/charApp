import express from "express";
import { newGroupChat } from "../controllers/chat.js";
import { isAuthenticate } from "../middlewares/auth.js";


const app = express.Router();



app.use(isAuthenticate)

app.post('/new', newGroupChat)





export default app;
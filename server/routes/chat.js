import express from "express";
import { getMyChat, getMyGroup, newGroupChat } from "../controllers/chat.js";
import { isAuthenticate } from "../middlewares/auth.js";


const app = express.Router();



app.use(isAuthenticate)

app.post('/new', newGroupChat)
app.post('/my', getMyChat)
app.post('/my/groups', getMyGroup)





export default app;
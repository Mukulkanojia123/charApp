import express from "express";
import { addMembers, getMyChat, getMyGroup, leaveGroup, newGroupChat, removeMember } from "../controllers/chat.js";
import { isAuthenticate } from "../middlewares/auth.js";


const app = express.Router();



app.use(isAuthenticate)

app.post('/new', newGroupChat)
app.post('/my', getMyChat)
app.post('/my/groups', getMyGroup)
app.put("/addmember", addMembers)
app.put("/removemember", removeMember)

app.delete('/leave/:id', leaveGroup)




export default app;
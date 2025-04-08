import express from "express";
import { addMembers, getChatDetails, getMyChat, getMyGroup, leaveGroup, newGroupChat, removeMember, sendAttachments } from "../controllers/chat.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";


const app = express.Router();



app.use(isAuthenticate)

app.post('/new', newGroupChat)
app.post('/my', getMyChat)
app.post('/my/groups', getMyGroup)
app.put("/addmember", addMembers)
app.put("/removemember", removeMember)

app.delete('/leave/:id', leaveGroup)


app.post('/message', attachmentsMulter, sendAttachments)

app.route('/:id').get(getChatDetails)



export default app;
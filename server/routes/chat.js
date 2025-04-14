import express from "express";
import { addMembers, deleteChat, getChatDetails, getMyChat, getMyGroup, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments, getMessages } from "../controllers/chat.js";
import { isAuthenticate } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";


const app = express.Router();



app.use(isAuthenticate)

app.post('/new', newGroupValidator() ,validateHandler,newGroupChat)
app.post('/my', getMyChat)
app.post('/my/groups', getMyGroup)
app.put("/addmember", addMemberValidator(),validateHandler, addMembers)
app.put("/removemember", removeMemberValidator(), validateHandler, removeMember)

app.delete('/leave/:id', chatIdValidator(),validateHandler,leaveGroup)


app.post('/message', attachmentsMulter, sendAttachmentsValidator() ,validateHandler,sendAttachments)

// Get Messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

app.route('/:id')
.get(getChatDetails)
.put(renameGroup)
.delete(deleteChat)



export default app;
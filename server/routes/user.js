import express from "express";
import { getMyProfile, login, newUser, logout, searchUser, sendFriendRequest, acceptFriendRequest, getMyNotifications  } from "../controllers/user.js";
import {singleAvatar} from "../middlewares/multer.js"
import { isAuthenticate } from "../middlewares/auth.js";
import { acceptRequestValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";


const app = express.Router();

app.post('/new', 
     singleAvatar,
     registerValidator(),
     validateHandler,
    newUser)
app.get('/', login)

app.use(isAuthenticate)

app.get('/me', getMyProfile)
app.get('/logout', logout)

app.get('/search', searchUser)

app.put('/sendrequest', sendRequestValidator(),validateHandler,sendFriendRequest)

app.put(
     "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
  );

app.get("/notifications", getMyNotifications);

export default app;
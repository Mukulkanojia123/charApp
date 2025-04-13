import express from "express";
import { getMyProfile, login, newUser, logout, searchUser  } from "../controllers/user.js";
import {singleAvatar} from "../middlewares/multer.js"
import { isAuthenticate } from "../middlewares/auth.js";
import { registerValidator, validateHandler } from "../lib/validators.js";


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
// app.get('/me', getMyProfile)
app.get('/search', searchUser)




export default app;
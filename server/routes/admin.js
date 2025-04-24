import express from "express";
import { adminLogin, allChats, allMessages, allUsers, getDashboardStats } from "../controllers/admin.js";
// import {
//   adminLogin,
//   adminLogout,
//   allChats,
//   allMessages,
//   allUsers,
//   getAdminData,
//   getDashboardStats,
// } from "../controllers/admin.js";
 import { adminLoginValidator, validateHandler } from "../lib/validators.js";
// import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.get('/')
app.post('/verify',adminLoginValidator,validateHandler,adminLogin)
app.get("/logout")


app.get("/users", allUsers)
app.get("/chat", allChats)
app.get("/message", allMessages)

app.get("/stats", getDashboardStats)

export default app;


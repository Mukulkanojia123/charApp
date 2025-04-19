import express from "express";
import { allUsers } from "../controllers/admin";
// import {
//   adminLogin,
//   adminLogout,
//   allChats,
//   allMessages,
//   allUsers,
//   getAdminData,
//   getDashboardStats,
// } from "../controllers/admin.js";
// import { adminLoginValidator, validateHandler } from "../lib/validators.js";
// import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.get('/')
app.post('/verify')
app.get("/logout")


app.get("/users", allUsers)
app.get("/chat")
app.get("/message")

app.get("/stats")

export default app;


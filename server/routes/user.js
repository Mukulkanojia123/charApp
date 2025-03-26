import express from "express";
import { login, newUser } from "../controllers/user.js";



const router = express.Router();

router.post('/new', newUser)
router.get('/', login)

export default router;
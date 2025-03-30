import express from "express";
import { login, newUser } from "../controllers/user.js";
import {multerUpload} from "../middlewares/multer.js"


const router = express.Router();

router.post('/new', 
    // multerUpload.single('avatar'),
    newUser)
router.get('/', login)

export default router;
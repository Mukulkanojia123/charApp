import  Jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utlis/utility.js";
import { TryCatch } from "./error.js";



const isAuthenticate = TryCatch((req, res, next)=>{
    const token = req.cookies['CHATTU_TOKEN'];
    if(!token) return next(new ErrorHandler('Please Login to Access Route', 401));

    const isDecode = Jwt.verify(token, process.env.JWT_KEY);

    req.user = isDecode._id;

    next();


})

export {isAuthenticate}
import  Jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utlis/utility.js";
import { TryCatch } from "./error.js";



const isAuthenticate = TryCatch((req, res, next)=>{
    // console.log(req.cookies)
    const token = req.cookies['chat-token'];
    // console.log(token)
    if(!token) return next(new ErrorHandler('Please Login to Access Route', 401));
    
    const isDecode = Jwt.verify(token, process.env.JWT_KEY);
  
    
    req.user = isDecode._id;
    

    next();


})

export {isAuthenticate}
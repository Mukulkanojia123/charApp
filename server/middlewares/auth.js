import  Jwt  from "jsonwebtoken";
import { ErrorHandler } from "../utlis/utility.js";
import { TryCatch } from "./error.js";
import {adminSecretKey} from '../app.js'
import { CHATTU_TOKEN } from "../constants/config.js";



const isAuthenticate = TryCatch((req, res, next)=>{
    // console.log(req.cookies)
    const token = req.cookies['chat-token'];
    // console.log(token)
    if(!token) return next(new ErrorHandler('Please Login to Access Route', 401));
    
    const isDecode = Jwt.verify(token, process.env.JWT_KEY);
  
    
    req.user = isDecode._id;
    

    next();


})

const adminOnly = (req, res, next) => {
    const token = req.cookies["chattu-admin-token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  };

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHATTU_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export {isAuthenticate, adminOnly, socketAuthenticator}
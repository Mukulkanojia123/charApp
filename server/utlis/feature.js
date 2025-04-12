import mongoose from "mongoose";
import jwt from 'jsonwebtoken'


const connectDB = (url) => {
    mongoose.connect(url, {dbName : 'chatApp'})
    .then((data)=>{
        console.log(data.connection.host);
    })
    .catch((err)=>{
        console.log(err)
    })
}

const cookieOption = {
    age : 15 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    sameSite : "none",
    secure : true

}

const sendToken = (res, user, code, message) =>{

    const token = jwt.sign({_id : user._id}, process.env.JWT_KEY);
    // console.log("token is created")
    return res.status(code).cookie("chat-token", token, cookieOption).json({
        success : true,
        user,
        message
    })



}

const emitEvent = (req, event, user, data) =>{

}

const deletFilesFromCloudinary = () => {

}


export {connectDB, sendToken, cookieOption, emitEvent, deletFilesFromCloudinary}
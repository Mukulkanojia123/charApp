import { User } from "../models/user.js";
import { sendToken } from "../utlis/feature.js";
import {TryCatch} from "../middlewares/error.js"
import { ErrorHandler } from "../utlis/utility.js";
import { compare } from "bcrypt";


const newUser = TryCatch(async(req, res) =>{
    const {name, username, password,bio} = req.body;
    console.log("user rew")
    const avatar = {
        public_id : 'nowijfo',
        url : "https://newimage.com"
    }

    const user = await User.create({name, username, password,bio,avatar});
    // res.status(200).json({
    //     message : "new user created",
    // }) 
    sendToken(res, user, 201, 'user created successfully')
})

const login = TryCatch(async(req, res, next)=>{
    
    const {username, password} = req.body;

    const user = User.findOne({username}).select("+password");

    if(!user) return next(new ErrorHandler("Invalid Username and Password", 404));

    const passMatch = await compare(password, user.password);
    
    if(!passMatch) return next(new ErrorHandler("Invalid password", 404));

    sendToken(res, user, 200, `welcome ${user.name}`)

})

const getMyProfile = async(req, res) => {}

export {
    login,
    newUser,
    getMyProfile
}
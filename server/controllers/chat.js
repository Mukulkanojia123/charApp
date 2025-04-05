import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utlis/utility.js";
import {Chat} from "../models/chat.js"


const newGroupChat = TryCatch(async(req, res, next) => {

    const {name, member} = req.body;

    if(member.length < 2) return next(new ErrorHandler("Insuficient Menber", 400))

    const allMember = [...member, req.user]

    await Chat.create({
        name,
        groupChat : true,
        creator : req.user,
        members : allMember
    })


}) 

export {newGroupChat}
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utlis/utility.js";
import {Chat} from "../models/chat.js"
import { emitEvent } from "../utlis/feature.js";
import { ALERT, REFETCH_CHAT } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";


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

    emitEvent(req, ALERT, allMember, `welcome to ${name}`)
    emitEvent(req, REFETCH_CHAT, member)

    return res.status(201).json({
        success : true,
        message : "group created"
    })


}) 
const getMyChat = TryCatch(async(req, res, next) => {

    
    const chats = await Chat.find({member : req.user}).populate("members", "name avatar")
    
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtherMember(members, req.user);
    
        return {
          _id,
          groupChat,
          avatar: groupChat
            ? members.slice(0, 3).map(({ avatar }) => avatar.url)
            : [otherMember.avatar.url],
          name: groupChat ? name : otherMember.name,
          members: members.reduce((prev, curr) => {
            if (curr._id.toString() !== req.user.toString()) {
              prev.push(curr._id);
            }
            return prev;
          }, []),
        };
      });

    return res.status(200).json({
        success : true,
        chat : transformedChats
    })


}) 

const getMyGroup = TryCatch(async(req, res, next)=>{

    const chats = await Chat.find({
        members : req.user,
        groupChat : true,
        creator : req.user
    }).populate("members", "name avatar")

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
      }));

      return res.status(200).json({
        success : groups,
        chats
      })
})

export {newGroupChat, getMyChat,getMyGroup}
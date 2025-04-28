import { User } from "../models/user.js";
import { sendToken , cookieOption} from "../utlis/feature.js";
import {TryCatch} from "./../middlewares/error.js"
import { ErrorHandler } from "../utlis/utility.js";
import { compare } from "bcrypt";
import { Chat } from "../models/chat.js";
import { NEW_REQUEST } from "../constants/events.js";
import { Request } from "../models/request.js";
import { getOtherMember } from "../lib/helper.js";


const newUser = TryCatch(async(req, res,next) =>{
    const {name, username, password,bio} = req.body;
    console.log("user rew")
    const file = req.file;
    
    if(!file) return next(new ErrorHandler("Please upload avatar"))

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
    
    const user = await User.findOne({username}).select("+password");
    
    if(!user) return next(new ErrorHandler("Invalid Username and Password", 404));
    
    
    const passMatch = await compare(password, user.password);
    
    if(!passMatch) return next(new ErrorHandler("Invalid password", 404));
   


    sendToken(res, user, 200, `welcome ${user.name}`)

})

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});


const logout = TryCatch(async(req, res, next)=>{

    return res.status(200).cookie("chat-token", "", {...cookieOption, maxAge : 0}).json({
        success : true,
        message : 'logout success full'
    })
})

const searchUser = TryCatch(async(req, res, next)=>{
    const {name = ""} = res.query;

    const myChat = await Chat.find({groupChat : false, members : req.user})

    const allUserFromMyChats = myChat.map((chat) => chat.members).flat();

    const allUsersExceptMeAndFriends = await User.find({
        _id : {$nin : allUserFromMyChats},                     // not in operator
        name : {$regex : name , $option : 'i' }
    })

    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));

    return res.status(200).json({
        success: true,
        name,
      });
})

const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
  
    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });
  
    if (request) return next(new ErrorHandler("Request already sent", 400));
  
    await Request.create({
      sender: req.user,
      receiver: userId,
    });
  
    emitEvent(req, NEW_REQUEST, [userId]);
  
    return res.status(200).json({
      success: true,
      message: "Friend Request Sent",
    });
  });

  const acceptFriendRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;
  
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");
  
    if (!request) return next(new ErrorHandler("Request not found", 404));
  
    if (request.receiver._id.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to accept this request", 401)
      );
  
    if (!accept) {
      await request.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }
  
    const members = [request.sender._id, request.receiver._id];
  
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);
  
    emitEvent(req, REFETCH_CHATS, members);
  
    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  });

  const getMyNotifications = TryCatch(async (req, res) => {
    const requests = await Request.find({ receiver: req.user }).populate(
      "sender",
      "name avatar"
    );
  
    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    }));
  
    return res.status(200).json({
      success: true,
      allRequests,
    });
  });
  
  const getMyFriends = TryCatch(async (req, res) => {
    const chatId = req.query.chatId;
  
    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");
  
    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user);
  
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });
  
    if (chatId) {
      const chat = await Chat.findById(chatId);
  
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
  
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  });
  
export {
    login,
    newUser,
    getMyProfile,
    logout,
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends
}
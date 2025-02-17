// avatar = [], 
// name,
// _id, 
// groupChat = false,
//  sameSender,
//   isOnline, 
//   newMessageAlert, 
//   index=0, 
//   handleDeleteOpenChat
export const sampleChats = [{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "amit patra",
    _id: '1',
    groupChat: false,
    members: ['1', '2']
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png",
        "https://www.w3schools.com/howto/img_avatar.png"
    ],
    name: "Abhey",
    _id: '2',
    groupChat: true,
    members: ['1', '2']
}]



export const sampleUsers = [
    {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: 'John Doe',
        _id: "1",

    },
    {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: 'John Boi',
        _id: "2",

    },

]




export const sampleNotifications = [
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Doe'
        }
        ,
        _id: "1",

    },
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Boi'
        }
        ,
        _id: "2",

    },

]


export const sampleMessage = [
    {
        attachments : [
            {
                public_id : 'asad',
                url : 'https://www.w3schools.com/howto/img_avatar.png'
            }
        ],
        content : 'ayaa h message',
        _id : 'vowi8u0_8er09f-e8fe',
        sender : {
            _id : "user._id",
            name : 'aman'
        },
        chat : "chatId",
        createAt : "2024-02-12T10:41:30.630Z" 

    },
    {
        attachments : [
            {
                public_id : 'asad2',
                url : 'https://www.w3schools.com/howto/img_avatar.png'
            }
        ],
        content : 'ayaa h message2',
        _id : 'vowi8u0_8er09f-e8fe2',
        sender : {
            _id : "skdnfowi",
            name : 'aman2'
        },
        chat : "chatId2",
        createAt : "2024-02-12T10:41:30.630Z" 

    }
]
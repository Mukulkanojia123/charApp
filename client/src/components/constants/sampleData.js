// avatar = [], 
// name,
// _id, 
// groupChat = false,
//  sameSender,
//   isOnline, 
//   newMessageAlert, 
//   index=0, 
//   handleDeleteOpenChat
export const sampleChats = [
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "amit patra",
    _id: '1',
    groupChat: false,
    members: ['1', '2']
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "robert William",
    _id: '2',
    groupChat: false,
    members: ['1', '2']
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Kanishka sharma",
    _id: '3',
    groupChat: false,
    members: ['1', '2']
},
{
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Abhishak M",
    _id: '4',
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
    _id: '5',
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
        // attachments : [
        //     {
        //         public_id : 'asad',
        //         url : 'https://www.w3schools.com/howto/img_avatar.png'
        //     }
        // ],
        content : 'ayaa h message',
        _id : 'vowi8u0_8er09f-e8fe',
        sender : {
            _id : "user._id",
            name : 'aman'
        },
        chat : "chatId",
        groupChat : false,
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
            avatar : "https://www.w3schools.com/howto/img_avatar.png",
            name : 'aman2'
        },
        chat : "chatId2",
        groupChat : true,
        createAt : "2024-02-12T10:41:30.630Z" 

    }
]

export const dashboardData = {
    users : [
        {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Doe',
            _id: "1",
            username : 'john_doe',
            friends : 20,
            groups : '5'
        },
        {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Boi',
            _id: "2",
            friends : 10,
            username : 'john_boi',
            groups : 5,
        },
    ],
    chats : [{
        name : 'Labadbass Group',
        avatar : ['https://www.w3schools.com/howto/img_avatar.png'],
        _id : '1',
        groupChat : false,
        members : [
            {_id : '1', avatar : "https://www.w3schools.com/howto/img_avatar.png"},
            {_id : '2', avatar : 'https://www.w3schools.com/howto/img_avatar.png'}
        ],
        totalMembers : 2,
        totalMessage : 20,
        creator : {
            name : 'Jon due',
            avatar : 'https://www.w3schools.com/howto/img_avatar.png'
        },
    },
    {
        name : 'Friends Group',
        avatar : ['https://www.w3schools.com/howto/img_avatar.png'],
        _id : '1',
        groupChat : false,
        members : ['1','2'],
        totalMembers : 2,
        totalMessage : 20,
        creator : {
            name : 'Jon due',
            avatar : 'https://www.w3schools.com/howto/img_avatar.png'
        },
    }
],
messages : [
    {
        attachments : [],
        content : 'Nitin ka message',
        _id : 'kdoif38ne88ryudf8',
        sender : {
            _id:"user._id",
            name : 'Chaman',
        },
        chat : 'chatId',
        groupChat : false,
        createdAt : '2024-02-12T10:41:30.630Z',
    }
]

}



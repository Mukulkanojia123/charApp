import { User } from "../models/user.js";


const newUser = async(req, res) =>{
    const {name, username, password,bio} = req.body;
    console.log("user rew")
    const avatar = {
        public_id : 'nowijfo',
        url : "https://newimage.com"
    }

    await User.create({name : "cha1m1an", username : "cha3man", password : "cham1an", bio : "pojov ojvjepoajvo",avatar});
    res.status(200).json({
        message : "new user created",
    }) 
}

const login = (req, res)=>{
    res.send('Hello World');
}

export {
    login,
    newUser
}
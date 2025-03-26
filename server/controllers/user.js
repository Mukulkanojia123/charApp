import { User } from "../models/user";

const newUser = async(req, res) =>{
    const {name, username, password,bio} = req.body;

    avatar = {
        public_id : 'nowijfo',
        url : "https://newimage.com"
    }

    await User.create({name, username, password, bio, avatar});
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
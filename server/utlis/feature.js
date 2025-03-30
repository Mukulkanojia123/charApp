import mongoose from "mongoose";


const connectDB = (url) => {
    mongoose.connect(url, {dbName : 'chatApp'})
    .then((data)=>{
        console.log(data.connection.host);
    })
    .catch((err)=>{
        console.log(err)
    })
}


export {connectDB}
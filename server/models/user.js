import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    bio : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : true,
            required : true
        }
    }

},{
    timestamps : true
}
)


export const User =  mongoose.models.User ||model("User", userSchema)
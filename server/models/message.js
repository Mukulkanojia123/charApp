import mongoose, {Schema , model, Types} from "mongoose";

const messageSchema = new Schema({
    content : String,
     attachment : [
        {
        public_id : {
            type  : String,
            required : true,
        },
        url : {
            type : String,
            required : true
        }
     }
    ],
    sender : {
        type : Types.ObjectId,
        ref : 'User'
    },
    chat : {
        type : Types.ObjectId,
        ref : "Chat",
        required : true,
    }
},
{
    timestamps : true,
}
)

export const Message = mongoose.models.Message || model('Message', messageSchema)
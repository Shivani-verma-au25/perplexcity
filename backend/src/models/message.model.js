import mongoose, { Schema } from "mongoose"

const messageSchema = new Schema({
    chat:{
        type : Schema.Types.ObjectId,
        ref : 'Chat',
        required : true,

    },
    content : {
        type :String,
        required : true
    },
    role:{
        type:String,
        enum:[ 'user' ,'ai'],
        required : true
    }
} ,{timestamps : true})

export const Message = mongoose.model('Message',messageSchema);
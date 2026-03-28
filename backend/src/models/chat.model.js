import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    title :{
        type : String,
        default : "New Chat",
        trim:true
    },

},
{timestamps: true}
);


export const Chat = mongoose.model("Chat",chatSchema);
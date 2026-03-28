import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { generateResponse, genrateChatTitle } from '../services/ai.service.js';
import { asyncHandler } from '../utils/asyncHandler.js'

export const sendMessage = asyncHandler( async (req ,res) =>{
    const {message , chat:chatId} = req.body;

    let title = null;
    let chat =null;

    // create chat
    if(!chatId){
        title = await genrateChatTitle(message);
        chat = await Chat.create({
            user : req.user._id,
            title
        })
    }
    //  user message 
    const userMessage = await Message.create({
        chat : chatId|| chat._id,
        content : message,
        role : "user"
    })
    // total messages
    const messages = await Message.find({chat : chatId || chat._id}).sort({ createdAt: 1 }).limit(10);;

    const result = await generateResponse(messages); 
    

    // // ai message respone
    const aiMessage = await Message.create({
        chat :chatId || chat._id,
        content:result,
        role : 'ai'
    })

    console.log("message" , messages);
    
    return res.status(201).json({
        success : true,
        title,
        chat,
        aiMessage,        
    })
})

// user's chat 
export const getChats = asyncHandler( async (req ,res) =>{
    const user = req.user;
    console.log("user" ,user);

    const chats = await Chat.find({user : user._id});
    
    if(!chats) {
        return res.status(401).json({
            success : false,
            message : "Chats not availbale."
        })
    };

    return res.status(201).json({
        success:true,
        message : "All chats",
        chats
    })
    
})


export const getMessages = asyncHandler(async(req, res) =>{
    const {chatId} = req.params;

    // find chat by chat id and user id
    const chat = await Chat.findOne({
        _id:chatId,
        user : req.user._id 
    })

    if(!chat){
        return res.status(409).json({
            success : false,
            message : "Chat not found"
        })
    };
    // find message using chatId    
    const allMessage = await Message.find({chat : chatId});

    return res.status(200).json({
        success : true,
        message : "All Messages fetched.",
        allMessage
    })
}) 


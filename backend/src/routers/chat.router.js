import {Router} from 'express'
import { deleteChats, getChats, getMessages, sendMessage } from '../controllers/chat.controller.js';
import { IsUserVerified } from '../middlewares/auth.middlware.js';


const router = Router();

router.route('/message').post(IsUserVerified , sendMessage)
router.route('/get-chats').get(IsUserVerified , getChats)
router.route('/get-messages/:chatId').get(IsUserVerified , getMessages)
router.route('/delete/:chatId').delete(IsUserVerified, deleteChats)


export default router;
import {Router} from 'express';
import { getMe, login, register,verifyUserEmail } from '../controllers/auth.controller.js';
import {loginValidator, registerValidation } from '../validator/auth.validator.js'
import { IsUserVerified } from '../middlewares/auth.middlware.js';

const router = Router();

router.route('/register').post(registerValidation, register)
router.route('/login').post(loginValidator, login)
router.route('/verify-email').get(verifyUserEmail)

// protected routes

router.route('/get-me').get(IsUserVerified , getMe)

export default router;
import {Router} from 'express';
import { login, register,verifyUserEmail } from '../controllers/auth.controller.js';
import {loginValidator, registerValidation } from '../validator/auth.validator.js'

const router = Router();

router.route('/register').post(registerValidation, register)
router.route('/login').post(loginValidator, login)
router.route('/verify-email').get(verifyUserEmail)

export default router;
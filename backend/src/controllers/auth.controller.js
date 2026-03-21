import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import { sendEmail } from '../services/mail.service.js';
import jwt from  'jsonwebtoken'

// register user
export const register = asyncHandler( async (req ,res) =>{
    const { username , email , password } = req.body;
    // check user exist or not 
    const existUser = await User.findOne({
        $or:[ {username},{email}]
    })

    if (existUser) {
        return res.status(400).json({
            success: false,
            message : "User with username and email already exist.",
            err: "User already exist."
        })
    }

    // if user is not exist create a new one
    const user = await User.create({
        username,
        email,
        password
    })

    // generate access token
    const token =await user.generateAccessToken()
    
    // send verificationa email 
    const mail = await sendEmail({
        to: email,
        subject : "Welcome to Perplexity.",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    });
    
    if (!mail) {
        return res.status(404).json({
            success : false,
            message : "Email is not sending",
            err : "Error while sending email"
        })
    }

    // find the create user in db
    const createdUser = await User.findOne(user._id).select("-password");
    console.log("created user" ,createdUser);
    
    // check user created or not
    if (!createdUser) {
        return res.status(401).json({
            success :false,
            message : "User not created.",
            err:"User not created yet."
        })
    }

    return res.status(201).json({
        success: true,
        message:'User registered successfully.',
        createdUser
    })

    
})


// login user
export const login = asyncHandler( async ( req,res) =>{
    const {email ,password} = req.body;
    // find user
    const user = await User.findOne({email})
    if (!user) {
        return res.status(400).json({
            success:false,
            message : "Invalid User",
            err : "User not found."
        })
    };

    // check passwor is correct or not
    const isPassworCorrect = await user.comparePassword(password);
    if(!isPassworCorrect){
        return res.status(400).json({
            success:false,
            message : "Incorrect password",
            err : "Passwor is not matched"
        })
    };

    if(!user.verified){
        return res.status(401).json({
            success:false,
            message:"You are not verified to login.Please verify first.",
            err:"User not Verifiled"
        })
    }

    // generate token 
    const token = await user.generateAccessToken();
    

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    };

    // set cookies 
    return res
    .status(201)
    .cookie('token',token ,options)
    .json({
        success:true,
        message : "Login successfully",
        user,
    })
})


// verify user email
export const verifyUserEmail = asyncHandler( async (req,res) =>{
    // get token from query
    const {token} = req.query;
    // verify token
    const decoded = jwt.verify(token , process.env.JWT_ACCESS_TOKEN);
    // find user
    const user = await User.findOne({email:decoded.email});

    if(!user){
        return res.status(400).json({
            success : false,
            message : "Invalid Token",
            err:"User not found"
        })
    };

    // user is exist then set verify true
    user.verified = true;
    // save changes
    await user.save();
    // await user.save({validateBeforeSave : false})

    const html = 
        `
            <h1>Email verified Successfully</h1>
            <p>You email has been verified.You can now log in to you account. </p>
            <a href='http://localhost:3000/api/auth/login' >Go to Login</a>
        `
    return res.send(html);

})

// get me 
export const getMe = asyncHandler (async(req, res) =>{
    const id = req.user._id; // getting user id from req.user.id set in middleware
    const user = await User.findById(id).select("-password");
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
            err:"User not found"
        })
    }
    return res.status(200).json({
        success:true ,
        message : "Fetched details.",
        user
    })

})
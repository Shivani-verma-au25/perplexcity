import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


export const IsUserVerified = asyncHandler( async (req ,res ,next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace('Bearer ' ,"");
        
        if(!token || token === "undefined"){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this resource. Please login ! ",
                err: "Invalid token"
            })
        }

        // if token is there then verify the token
        const decoded = await jwt.verify(token , process.env.JWT_ACCESS_TOKEN);
        if(!decoded ){
            return res.status(401).json({
                success : true,
                message : "Token is invalid or expired. Please login again!",
                err:"Token is invalid or expired"
            })
        }
        // if token is valid then get the user from the token
        const user = await User.findById(decoded._id).select('-password')
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!",
                err:"user not found"
            })
        }

        // return the user to the next middleware
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in isAuth middleware", error);
        return res.status(500).json({
            success : false,
            message : "Auth failed",
            err:"Auth failed"
        })   
    }
})
import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username :{
        type:String,
        required:true,
        lowerCase : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase : true,
    },
    password:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },

} ,{timestamps:true});


// hashed password
userSchema.pre('save', async function(next) {
    // if password is not modified then return next
    if(!this.isModified('password')) return next();
    // if password is modified then hash the password   
    this.password = await bcrypt.hash(this.password,10);
    next(); 
})

// compare password
userSchema.methods.comparePassword = async function (password) {
    if(!this.password) return  console.log("Password not found for user", this.username);
    return await bcrypt.compare(password , this.password);
}


userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id : this._id,
        email : this.email
    } , process.env.JWT_ACCESS_TOKEN ,{expiresIn :process.env.JWT_ACCESS_TOKEN_EXPIRE})
    
}

// generate token

export const User = mongoose.model("User",userSchema);
import { mongoose } from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter a username'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
},{timestamps:true})

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
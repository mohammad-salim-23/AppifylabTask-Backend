import {model,Schema} from "mongoose";
import mongoose from 'mongoose';
import { IUserModel, TRegisterUser, TUser } from "./auth.interface";
import bcrypt from "bcrypt";
const userAuthSchema = new Schema <TUser>({
    firstName:{
        type:String,
        required:true , 
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
     role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
},{
    timestamps:true
});
userAuthSchema.statics.isUserExistByEmail = async function (email:string){
    return await User.findOne({email:email});
};
userAuthSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  if(!hashedPassword){
    throw new Error('Hashed password is missing or invald');
  }
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const User = model<TUser,IUserModel>('User',userAuthSchema);


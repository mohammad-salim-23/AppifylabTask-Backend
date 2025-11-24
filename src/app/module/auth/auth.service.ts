import { TRegisterUser } from "./auth.interface";
import * as bcrypt from "bcrypt";
import { User } from "./auth.model";
import { StatusCodes } from "http-status-codes";

import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { createToken } from "./auth.utils";

const registerUser = async(payload: TRegisterUser)=>{
    payload.password = await bcrypt.hash(payload.password,10);
    const result = await User.create(payload);
    return result;

}

const loginUser = async(payload:TRegisterUser)=>{
    //checking if the user exist
    const user = await User.isUserExistByEmail(payload.email);
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND,'User does not exist',);
    }
    //checking if the user is blocked
    const userStatus = user?.isBlocked;
    if(userStatus){
      throw new AppError(StatusCodes.FORBIDDEN,'User is blocked, please contact admin',);
    }
    //checking if the password is correct
    if(!(await User.isPasswordMatched(payload?.password,user?.password))){
        throw new AppError(StatusCodes.FORBIDDEN,'password is not matched');
    }
    const jwtPayload = {
        userEmail: user?.email,
        role:user?.role,
        firstName: user?.firstName
    };
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );
    return {accessToken};
}
const getAllUser = async()=>{
    const users = await User.find({},{password:0});
    if(!users.length){
        throw new AppError(StatusCodes.NOT_FOUND,'No users found');
    }
    return users;
};
const updateUserStatus = async(userEmail:string,isBlocked:boolean)=>{
    const user = await User.findById(userEmail);
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND,'User not found');
    }
    user.isBlocked = isBlocked;
    await user.save();
    return user;
}


export const AuthServices = {
    registerUser,
    loginUser,
    getAllUser,
    updateUserStatus,
   
}


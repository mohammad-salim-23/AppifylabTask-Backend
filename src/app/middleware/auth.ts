import { NextFunction, Request, Response } from "express";


import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config"; 
import jwt,{ JwtPayload } from "jsonwebtoken";
import { User } from "../module/auth/auth.model";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../module/auth/auth.interface";

const auth = (...requiredRoles:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization;
        if(!token){
            throw new AppError(StatusCodes.UNAUTHORIZED,'You are not authorized to access this resource');
        }
        //checking if the given token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;
  console.log("Decoded Token:",decoded);
  const {role,userEmail,iat} = decoded;
  const user = await User.isUserExistByEmail(userEmail);
  if(!user){
    throw new AppError(StatusCodes.UNAUTHORIZED,'User no longer exists');
  }
  const userStatus = user?.isBlocked;
    if(userStatus){
        throw new AppError(StatusCodes.FORBIDDEN,'User is blocked, please contact admin');
    }
    if(requiredRoles.length && !requiredRoles.includes(role as TUserRole)){
        throw new AppError(StatusCodes.UNAUTHORIZED,'You do not have permission to access this resource');
    }
    req.user = {
        id:user.id,
        firstName:user.firstName,
        email:user.email,
        role:user.role,

    };
    next();
    })
}
export default auth;
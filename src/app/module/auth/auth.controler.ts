import { StatusCodes } from "http-status-codes";

import { AuthServices } from "./auth.service";
import { User } from "./auth.model";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const registerUser = catchAsync(async(req,res)=>{
    const {email} = req.body;
     const user = await User.isUserExistByEmail(email);
     if(user){
        return sendResponse(res,{
            success:false,
            message:'User already exists',
            statusCode:409,
        data:null
        })
     }
    const result = await AuthServices.registerUser(req.body);
    //extract fields
    const filteredData = {
        _id:result._id,
        firstName:result.firstName,
        lastName:result.lastName,
        email:result.email,
    };
    sendResponse(res,{
        success:true,
        message:'User registered successfully',
        statusCode:201,
        data:filteredData
    });
} 
);
const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body);
    console.log(result);
    const {accessToken} = result;
    sendResponse(res,{
        success:true,
        message:'User logged in successfully',
        statusCode:200,
        data:{accessToken}
    });
});
const getAllUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.getAllUser();
    sendResponse(res,{
        success:true,
        message:'Users retrieved successfully',
        statusCode:200,
        data:result        
    });
});
const updateUserStatusController = catchAsync(async(req,res)=>{
      const {id} = req.params;
      const {isBlocked} = req.body;
        const result = await AuthServices.updateUserStatus(id,isBlocked);
        sendResponse(res,{
            success:true,
            message:'User status updated successfully',
            statusCode:200,
            data:result
        });
});

export const AuthControllers = {
    registerUser,
    loginUser,
    getAllUser,
    updateUserStatusController,
   
}
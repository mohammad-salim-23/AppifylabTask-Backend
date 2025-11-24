import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config"; 
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../module/auth/auth.model";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../module/auth/auth.interface";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization;

        // Check if token exists
        if (!token) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You are not authorized to access this resource'
            );
        }

        // Remove "Bearer " prefix if it exists
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // Verify JWT token
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        } catch (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
        }

        console.log("Decoded Token:", decoded);

        const { role, userEmail , firstName} = decoded;

        // Check if user exists
        const user = await User.isUserExistByEmail(userEmail);
        if (!user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'User no longer exists');
        }

        // Check if user is blocked
        if (user.isBlocked) {
            throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked, please contact admin');
        }

        // Check if user has required role
        if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You do not have permission to access this resource'
            );
        }

        // Attach user info to request object
        req.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        next();
    });
};

export default auth;

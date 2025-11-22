import { Model } from "mongoose";
const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export type TLoginUser = {
    email: string;
    password:string;
};
export type TRegisterUser = {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
export interface TUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
//define mongoose model interface
export interface IUserModel extends Model<TUser>{
    //instance methods for checking if the user exists
  isUserExistByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
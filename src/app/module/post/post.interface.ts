import {  Model, Types } from "mongoose";

export interface IPost {
    author: Types.ObjectId; // Reference to User
    text?: string;          
    image?: string;         
    visibility: 'public' | 'private';
    likesCount: number;
    commentsCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostModel extends Model<IPost> {
    // Optional static methods
    getFeed(userId: string, limit: number, lastSeen?: Date): Promise<IPost[]>;
    getPostsByAuthor(userId: string, limit: number, lastSeen?: Date): Promise<IPost[]>;
}

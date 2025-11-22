import { Model, Types } from "mongoose";

export type TVisibility = 'public'|'private';

export interface IComment {
    _id:Types.ObjectId;
    postId: Types.ObjectId; // Reference to Post
    parentComment?: Types.ObjectId; //if reply->parent comment id
    author: Types.ObjectId; // Reference to User
    text: string;
    likesCount: number;
    replyCount: number;
    createdAt?: Date;
    updatedAt?: Date;
    
}
export interface ICommentModel extends Model<IComment>{
  //get top level comments for a post
  getCommentsByPost(
    postId: Types.ObjectId | string,
    limit: number,
    lastSeen?: Date
  ):Promise<IComment[]>;
    //get replies for a comment
  getRepliesByComment(
    commentId: Types.ObjectId | string,
    limit: number,
    lastSeen?: Date
  ):Promise<IComment[]>;
}

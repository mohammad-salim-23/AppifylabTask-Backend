import { Types, Model } from "mongoose";

export interface ILike {
  user: Types.ObjectId;               
  targetId: Types.ObjectId;          
  targetType: "Post" | "Comment";  
}

export interface ILikeModel extends Model<ILike> {
  toggleLike(
    userId: Types.ObjectId | string,
    targetId: Types.ObjectId | string,
    targetType: "Post" | "Comment"
  ): Promise<{ liked: boolean }>;
}

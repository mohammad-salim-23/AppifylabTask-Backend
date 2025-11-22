
import { Schema, model, Model, Types } from "mongoose";
import { ILike, ILikeModel } from "./like.interface";


const likeSchema = new Schema<ILike>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: Schema.Types.ObjectId, required: true, refPath: 'targetType' },
  targetType: { type: String, required: true, enum: ['Post', 'Comment'] },
}, { timestamps: true });

// prevent duplicate likes
likeSchema.index({ user: 1, targetId: 1 }, { unique: true });

// static method for toggle
likeSchema.statics.toggleLike = async function(
  userId: string,
  targetId: string,
  targetType: "Post" | "Comment"
) {
  const existing = await this.findOne({ user: userId, targetId, targetType });
  if (existing) {
    await existing.deleteOne();
    return { liked: false };
  } else {
    await this.create({ user: userId, targetId, targetType });
    return { liked: true };
  }
};

export const Like = model<ILike, ILikeModel>("Like", likeSchema);

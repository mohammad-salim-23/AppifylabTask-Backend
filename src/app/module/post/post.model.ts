import { Schema, model, Types } from "mongoose";
import { IPost, IPostModel } from "./post.interface";

const postSchema = new Schema<IPost>({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    image: { type: String },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
}, { timestamps: true });


postSchema.statics.getFeed = async function(userId: string, limit: number, lastSeen?: Date) {
    const query: any = { visibility: 'public' };
    if (lastSeen) query.createdAt = { $lt: lastSeen };
    return this.find(query)
               .sort({ createdAt: -1 })
               .limit(limit)
               .populate('author', 'firstName lastName email')
               .lean();
};

export const Post = model<IPost, IPostModel>('Post', postSchema);

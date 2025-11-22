import { Schema, Types } from "mongoose";
import { IComment, ICommentModel } from "./comment.interface";
import { model } from "mongoose";

const commentSchema = new Schema<IComment>({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true , index:true},
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' ,default:null,index:true},
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true ,index:true},
    text: { type: String, required: true, trim: true },
    likesCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
}, { 
    timestamps: true
});

//Indexes for fast queries
commentSchema.index({postId:1,createdAt:-1});
commentSchema.index({parentComment:1,createdAt:-1});

//cursor based pagination for top-level comments
commentSchema.statics.getCommentsByPost = async function(postId,limit=10,lastSeen){
    const query : any = {postId:new  Types.ObjectId(postId as string),parentComment:null};
    if(lastSeen) query.createdAt = {$lt:lastSeen};
    return this.find(query)
                    .sort({createdAt:-1})
                    .limit(limit)
                    .populate("author","firstName lastName email")
                    .lean();
};
commentSchema.statics.getRepliesByComment = async function(commentId, limit = 10, lastSeen) {
  const query: any = { parentComment:new Types.ObjectId(commentId as string) };
  if (lastSeen) query.createdAt = { $lt: lastSeen };
  return this.find(query)
             .sort({ createdAt: -1 })
             .limit(limit)
             .populate("author", "firstName lastName email")
             .lean();
};
export const Comment = model<IComment,ICommentModel>("Comment",commentSchema);
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    parentComment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment', default: null, index: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    text: { type: String, required: true, trim: true },
    likesCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
}, {
    timestamps: true
});
//Indexes for fast queries
commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1, createdAt: -1 });
//cursor based pagination for top-level comments
commentSchema.statics.getCommentsByPost = function (postId_1) {
    return __awaiter(this, arguments, void 0, function* (postId, limit = 10, lastSeen) {
        const query = { postId: new mongoose_1.Types.ObjectId(postId), parentComment: null };
        if (lastSeen)
            query.createdAt = { $lt: lastSeen };
        return this.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("author", "firstName lastName email")
            .lean();
    });
};
commentSchema.statics.getRepliesByComment = function (commentId_1) {
    return __awaiter(this, arguments, void 0, function* (commentId, limit = 10, lastSeen) {
        const query = { parentComment: new mongoose_1.Types.ObjectId(commentId) };
        if (lastSeen)
            query.createdAt = { $lt: lastSeen };
        return this.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("author", "firstName lastName email")
            .lean();
    });
};
exports.Comment = (0, mongoose_2.model)("Comment", commentSchema);

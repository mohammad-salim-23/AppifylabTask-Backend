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
exports.CommentService = void 0;
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
const addComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // optionally validate post exists and visibility (if private)
    const post = yield post_model_1.Post.findById(payload.postId);
    if (!post)
        throw new Error("Post not found");
    const comment = yield comment_model_1.Comment.create({
        postId: payload.postId,
        parentComment: (_a = payload.parentComment) !== null && _a !== void 0 ? _a : null,
        author: payload.author,
        text: payload.text
    });
    // increment comment / reply counters atomically
    if (payload.parentComment) {
        // this is a reply
        yield comment_model_1.Comment.updateOne({ _id: payload.parentComment }, { $inc: { replyCount: 1 } });
    }
    else {
        // top-level comment for post
        yield post_model_1.Post.updateOne({ _id: payload.postId }, { $inc: { commentsCount: 1 } });
    }
    return comment;
});
const getComments = (postId_1, ...args_1) => __awaiter(void 0, [postId_1, ...args_1], void 0, function* (postId, limit = 10, lastSeen) {
    return comment_model_1.Comment.getCommentsByPost(postId, limit, lastSeen);
});
const getReplies = (commentId_1, ...args_1) => __awaiter(void 0, [commentId_1, ...args_1], void 0, function* (commentId, limit = 10, lastSeen) {
    return comment_model_1.Comment.getRepliesByComment(commentId, limit, lastSeen);
});
const updateCommentService = (commentId, userId, newText) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield comment_model_1.Comment.findOneAndUpdate({ _id: commentId, author: userId }, {
        $set: {
            text: newText,
            updatedAt: new Date()
        }
    }, { new: true });
    if (!updated)
        throw new Error("Comment not found or unauthorized");
    return updated;
});
const deleteCommentService = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findOneAndDelete({
        _id: commentId,
        author: userId
    });
    if (!comment)
        throw new Error("Comment not found or unauthorized");
    // counter rollback 
    if (comment.parentComment) {
        yield comment_model_1.Comment.updateOne({ _id: comment.parentComment }, { $inc: { replyCount: -1 } });
    }
    else {
        yield post_model_1.Post.updateOne({ _id: comment.postId }, { $inc: { commentsCount: -1 } });
    }
    return comment;
});
exports.CommentService = {
    addComment,
    getComments,
    getReplies,
    updateCommentService,
    deleteCommentService
};

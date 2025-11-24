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
exports.PostService = void 0;
const post_model_1 = require("./post.model");
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.create(payload);
    return post;
});
const getFeed = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, limit = 10, lastSeen) {
    const posts = yield post_model_1.Post.getFeed(userId, limit, lastSeen);
    return posts;
});
// UPDATE POST
const updatePost = (postId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findOne({ _id: postId, author: userId });
    if (!post)
        return null;
    if (data.text !== undefined)
        post.text = data.text;
    if (data.image !== undefined)
        post.image = data.image;
    if (data.visibility !== undefined)
        post.visibility = data.visibility;
    yield post.save();
    return post;
});
// DELETE POST
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findOne({ _id: postId, author: userId });
    if (!post)
        return null;
    yield post_model_1.Post.deleteOne({ _id: postId });
    return true;
});
exports.PostService = {
    createPost,
    getFeed,
    updatePost,
    deletePost
};

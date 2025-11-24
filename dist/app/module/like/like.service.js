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
exports.LikeService = void 0;
const post_model_1 = require("../post/post.model");
const like_model_1 = require("./like.model");
const toggleLike = (userId, targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield like_model_1.Like.findOne({ user: userId, targetId, targetType });
    let liked;
    if (existing) {
        yield existing.deleteOne();
        liked = false;
        if (targetType === "Post") {
            yield post_model_1.Post.findByIdAndUpdate(targetId, { $inc: { likesCount: -1 } });
        }
    }
    else {
        yield like_model_1.Like.create({ user: userId, targetId, targetType });
        liked = true;
        if (targetType === "Post") {
            yield post_model_1.Post.findByIdAndUpdate(targetId, { $inc: { likesCount: 1 } });
        }
    }
    return { liked };
});
exports.LikeService = {
    toggleLike
};

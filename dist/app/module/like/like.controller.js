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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const like_service_1 = require("./like.service");
const like_model_1 = require("./like.model");
const toggleLike = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { targetId, targetType } = req.body;
    const result = yield like_service_1.LikeService.toggleLike(userId, targetId, targetType);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: result.liked ? "Liked" : "Unliked",
        statusCode: 200,
        data: result
    });
}));
const getLikesByPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    // Find all likes for this post and populate user info
    const likes = yield like_model_1.Like.find({ targetId: postId, targetType: "Post" }).populate("user", "firstName lastName avatar");
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Likes fetched successfully",
        statusCode: 200,
        data: likes
    });
}));
exports.LikeController = {
    toggleLike,
    getLikesByPost
};

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
exports.PostController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const post_service_1 = require("./post.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Creating post with body:", req.user.id, req.body);
    const author = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { text, image, visibility } = req.body;
    const post = yield post_service_1.PostService.createPost({ author, text, image, visibility });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Post created successfully",
        statusCode: 201,
        data: post
    });
}));
const getFeed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const limit = Number(req.query.limit) || 10;
    const lastSeen = req.query.lastSeen ? new Date(req.query.lastSeen) : undefined;
    const posts = yield post_service_1.PostService.getFeed(userId, limit, lastSeen);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Posts retrieved successfully",
        statusCode: 200,
        data: posts
    });
}));
// UPDATE POST
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = yield post_service_1.PostService.updatePost(postId, userId, req.body);
    if (!post)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Not allowed to update this post");
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Post updated successfully",
        statusCode: 200,
        data: post
    });
}));
// DELETE POST
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const userId = req.user.id;
    const deleted = yield post_service_1.PostService.deletePost(postId, userId);
    if (!deleted)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Not allowed to delete this post");
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Post deleted successfully",
        statusCode: 200,
        data: null
    });
}));
exports.PostController = {
    createPost,
    getFeed,
    updatePost,
    deletePost
};

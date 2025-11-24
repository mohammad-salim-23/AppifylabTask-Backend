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
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const comment_service_1 = require("./comment.service");
const addComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = req.user.id;
    const { postId, text, parentComment } = req.body;
    const comment = yield comment_service_1.CommentService.addComment({ postId, author, text, parentComment });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Comment added",
        statusCode: 201,
        data: comment
    });
}));
const getComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const limit = Number(req.query.limit) || 10;
    const lastSeen = req.query.lastSeen ? new Date(req.query.lastSeen) : undefined;
    const comments = yield comment_service_1.CommentService.getComments(postId, limit, lastSeen);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Comments retrieved",
        statusCode: 200,
        data: comments
    });
}));
const getReplies = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const limit = Number(req.query.limit) || 10;
    const lastSeen = req.query.lastSeen ? new Date(req.query.lastSeen) : undefined;
    const replies = yield comment_service_1.CommentService.getReplies(commentId, limit, lastSeen);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Replies retrieved",
        statusCode: 200,
        data: replies
    });
}));
//Update Comment
const updateComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const { text } = req.body;
    const updatedComment = yield comment_service_1.CommentService.updateCommentService(commentId, userId, text);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Comment updated successfully",
        statusCode: 200,
        data: updatedComment
    });
}));
//Delete Comment
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const deletedComment = yield comment_service_1.CommentService.deleteCommentService(commentId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Comment deleted successfully",
        statusCode: 200,
        data: deletedComment
    });
}));
exports.CommentController = {
    addComment,
    getComments,
    getReplies,
    updateComment,
    deleteComment
};

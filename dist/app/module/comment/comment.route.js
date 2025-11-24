"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const addCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string().min(1),
        text: zod_1.z.string().min(1),
        parentComment: zod_1.z.string().optional()
    })
});
// add comment / reply
router.post("/", (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(addCommentSchema), comment_controller_1.CommentController.addComment);
// get top-level comments for a post 
router.get("/:postId", (0, auth_1.default)("user", "admin"), comment_controller_1.CommentController.getComments);
//get reply
router.get("/replies/:commentId", (0, auth_1.default)("user", "admin"), comment_controller_1.CommentController.getReplies);
router.patch("/:commentId", (0, auth_1.default)("user", "admin"), comment_controller_1.CommentController.updateComment);
router.delete("/:commentId", (0, auth_1.default)("user", "admin"), comment_controller_1.CommentController.deleteComment);
exports.commentRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_validation_1 = require("./post.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const post_controller_1 = require("./post.controller");
const router = (0, express_1.Router)();
// Protected routes
router.post('/', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(post_validation_1.createPostValidation), post_controller_1.PostController.createPost);
router.get('/feed', (0, auth_1.default)('user', 'admin'), post_controller_1.PostController.getFeed);
router.patch('/:id', (0, auth_1.default)("user", "admin"), post_controller_1.PostController.updatePost);
router.delete('/:id', (0, auth_1.default)('user', 'admin'), post_controller_1.PostController.deletePost);
exports.postRoutes = router;

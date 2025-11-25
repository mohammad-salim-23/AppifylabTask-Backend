"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = require("express");
const like_controller_1 = require("./like.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("user", "admin"), like_controller_1.LikeController.toggleLike);
router.get("/post/:postId", (0, auth_1.default)("user", "admin"), like_controller_1.LikeController.getLikesByPost);
exports.likeRoutes = router;

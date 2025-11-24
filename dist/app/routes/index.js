"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../module/auth/auth.route");
const post_route_1 = require("../module/post/post.route");
const comment_route_1 = require("../module/comment/comment.route");
const like_route_1 = require("../module/like/like.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes
    },
    {
        path: "/post",
        route: post_route_1.postRoutes
    },
    {
        path: "/comment",
        route: comment_route_1.commentRoutes
    },
    {
        path: "/likes",
        route: like_route_1.likeRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

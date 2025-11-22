import { Router } from "express";
import { createPostValidation } from "./post.validation";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { PostController } from "./post.controller";

const router = Router();

// Protected routes
router.post(
    '/',
    auth('user', 'admin'),
    validateRequest(createPostValidation),
    PostController.createPost
);

router.get(
    '/feed',
    auth('user', 'admin'),
    PostController.getFeed
);

export const postRoutes = router;

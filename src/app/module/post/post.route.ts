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
router.patch(
    '/:id',
    auth("user","admin"),
    PostController.updatePost
)
router.delete( '/:id',
    auth('user','admin'),
    PostController.deletePost
)
export const postRoutes = router;

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostService } from "./post.service";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

const createPost = catchAsync(async(req: Request, res: Response) => {
    console.log("Creating post with body:", req.user.id, req.body);
    const author = req.user?.id; 
    const { text, image, visibility } = req.body;
    const post = await PostService.createPost({ author, text, image, visibility });
    sendResponse(res, {
        success: true,
        message: "Post created successfully",
        statusCode: 201,
        data: post
    });
});

const getFeed = catchAsync(async(req: Request, res: Response) => {
    const userId = req.user?.id;
    const limit = Number(req.query.limit) || 10;
    const lastSeen = req.query.lastSeen ? new Date(req.query.lastSeen as string) : undefined;

    const posts = await PostService.getFeed(userId!, limit, lastSeen);
    sendResponse(res, {
        success: true,
        message: "Posts retrieved successfully",
        statusCode: 200,
        data: posts
    });
});
// UPDATE POST
const updatePost = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.user!.id;

    const post = await PostService.updatePost(postId, userId, req.body);

    if (!post) throw new AppError(StatusCodes.UNAUTHORIZED, "Not allowed to update this post");

    sendResponse(res, {
        success: true,
        message: "Post updated successfully",
        statusCode: 200,
        data: post
    });
});
// DELETE POST
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.id;
    const userId = req.user!.id;

    const deleted = await PostService.deletePost(postId, userId);

    if (!deleted) throw new AppError(StatusCodes.UNAUTHORIZED, "Not allowed to delete this post");

    sendResponse(res, {
        success: true,
        message: "Post deleted successfully",
        statusCode: 200,
        data: null
    });
});
export const PostController = {
    createPost,
    getFeed,
    updatePost,
    deletePost
};

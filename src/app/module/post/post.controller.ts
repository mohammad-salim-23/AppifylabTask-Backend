import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostService } from "./post.service";

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

export const PostController = {
    createPost,
    getFeed,
};

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentService } from "./comment.service";


const addComment = catchAsync(async (req: Request, res: Response) => {
  const author = req.user!.id;
  const { postId, text, parentComment } = req.body;
  const comment = await CommentService.addComment({ postId, author, text, parentComment });
  sendResponse(res, {
    success: true,
    message: "Comment added",
    statusCode: 201,
    data: comment
  });
});

const getComments = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const limit = Number(req.query.limit) || 10;
  const lastSeen = req.query.lastSeen ? new Date(req.query.lastSeen as string) : undefined;
  const comments = await CommentService.getComments(postId, limit, lastSeen);
  sendResponse(res, {
    success: true,
    message: "Comments retrieved",
    statusCode: 200,
    data: comments
  });
});


export const CommentController = { addComment, getComments};

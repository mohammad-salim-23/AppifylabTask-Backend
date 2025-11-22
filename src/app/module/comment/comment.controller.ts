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

//Update Comment
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const userId = req.user!.id;
  const { text } = req.body;

  const updatedComment = await CommentService.updateCommentService(commentId, userId, text);

  sendResponse(res, {
    success: true,
    message: "Comment updated successfully",
    statusCode: 200,
    data: updatedComment
  });
});

//Delete Comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const userId = req.user!.id;

  const deletedComment = await CommentService.deleteCommentService(commentId, userId);

  sendResponse(res, {
    success: true,
    message: "Comment deleted successfully",
    statusCode: 200,
    data: deletedComment
  });
});

export const CommentController = {
  addComment,
  getComments,
  updateComment,
  deleteComment
};

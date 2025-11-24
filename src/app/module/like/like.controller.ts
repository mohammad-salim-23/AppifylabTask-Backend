import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LikeService } from "./like.service";
import { Like } from "./like.model";

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { targetId, targetType } = req.body;

  const result = await LikeService.toggleLike(userId, targetId, targetType);
  sendResponse(res, {
    success: true,
    message: result.liked ? "Liked" : "Unliked",
    statusCode: 200,
    data: result
  });
});
const getLikesByPost = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;

  // Find all likes for this post and populate user info
  const likes = await Like.find({ targetId: postId, targetType: "Post" }).populate("user", "firstName lastName avatar");

  sendResponse(res, {
    success: true,
    message: "Likes fetched successfully",
    statusCode: 200,
    data: likes
  });
});
export const LikeController = {
  toggleLike,
  getLikesByPost
};

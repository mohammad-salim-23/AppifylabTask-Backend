import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LikeService } from "./like.service";

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

export const LikeController = {
  toggleLike
};

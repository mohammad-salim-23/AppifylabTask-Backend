import { Like } from "./like.model";

const toggleLike = async (userId: string, targetId: string, targetType: "Post" | "Comment") => {
  return Like.toggleLike(userId, targetId, targetType);
};

export const LikeService = {
  toggleLike
};

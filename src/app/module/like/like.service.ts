import { Post } from "../post/post.model";
import { Like } from "./like.model";

const toggleLike = async (userId: string, targetId: string, targetType: "Post" | "Comment") => {
  const existing = await Like.findOne({ user: userId, targetId, targetType });
  let liked: boolean;

  if (existing) {
    await existing.deleteOne();
    liked = false;
    if (targetType === "Post") {
      await Post.findByIdAndUpdate(targetId, { $inc: { likesCount: -1 } });
    }
  } else {
    await Like.create({ user: userId, targetId, targetType });
    liked = true;
    if (targetType === "Post") {
      await Post.findByIdAndUpdate(targetId, { $inc: { likesCount: 1 } });
    }
  }

  return { liked };
};
export const LikeService = {
  toggleLike
};

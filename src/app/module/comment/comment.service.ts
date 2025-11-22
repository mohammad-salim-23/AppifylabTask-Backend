import { Comment } from "./comment.model";
import { Post } from "../post/post.model";

const addComment = async(payload: {
  postId: string,
  author: string,
  text: string,
  parentComment?: string
}) => {
  // optionally validate post exists and visibility (if private)
  const post = await Post.findById(payload.postId);
  if (!post) throw new Error("Post not found");

  const comment = await Comment.create({
    postId: payload.postId,
    parentComment: payload.parentComment ?? null,
    author: payload.author,
    text: payload.text
  });

  // increment comment / reply counters atomically
  if (payload.parentComment) {
    // this is a reply
    await Comment.updateOne({ _id: payload.parentComment }, { $inc: { replyCount: 1 } });
  } else {
    // top-level comment for post
    await Post.updateOne({ _id: payload.postId }, { $inc: { commentsCount: 1 } });
  }

  return comment;
};

const getComments = async(postId: string, limit = 10, lastSeen?: Date) => {
  return Comment.getCommentsByPost(postId, limit, lastSeen);
};

const getReplies = async(commentId: string, limit = 10, lastSeen?: Date) => {
  return Comment.getRepliesByComment(commentId, limit, lastSeen);
};

export const CommentService = {
  addComment,
  getComments,
  getReplies
};

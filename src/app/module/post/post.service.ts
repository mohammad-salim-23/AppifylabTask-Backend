import { Post } from "./post.model";
import { IPost } from "./post.interface";

const createPost = async(payload: { author: string, text: string, image?: string, visibility?: 'public' | 'private' }) => {
    const post = await Post.create(payload);
    return post;
};

const getFeed = async(userId: string, limit: number = 10, lastSeen?: Date) => {
    const posts = await Post.getFeed(userId, limit, lastSeen);
    return posts;
};
 // UPDATE POST
const updatePost = async (postId: string, userId: string, data: any) => {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) return null;

    if (data.text !== undefined) post.text = data.text;
    if (data.image !== undefined) post.image = data.image;
    if (data.visibility !== undefined) post.visibility = data.visibility;

    await post.save();
    return post;
};
// DELETE POST
const deletePost = async (postId: string, userId: string) => {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) return null;

    await Post.deleteOne({ _id: postId });

    return true;
};

export const PostService = {
    createPost,
    getFeed,
    updatePost,
    deletePost
};

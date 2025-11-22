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

export const PostService = {
    createPost,
    getFeed,
};

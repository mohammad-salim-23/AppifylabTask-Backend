import {Router} from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { postRoutes } from '../module/post/post.route';
import { commentRoutes } from '../module/comment/comment.route';


const router = Router();

const moduleRoutes = [
    {
        path:"/auth",
        route:authRoutes
    },
    {
        path:"/post",
        route:postRoutes
    },
    {
        path:"/comment",
        route:commentRoutes
    }
];
moduleRoutes.forEach((route)=>router.use(route.path,route.route));

export default router;
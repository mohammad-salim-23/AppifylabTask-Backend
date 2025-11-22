import {Router} from 'express';
import { authRoutes } from '../module/auth/auth.route';
import { postRoutes } from '../module/post/post.route';


const router = Router();

const moduleRoutes = [
    {
        path:"/auth",
        route:authRoutes
    },
    {
        path:"/post",
        route:postRoutes
    }
];
moduleRoutes.forEach((route)=>router.use(route.path,route.route));

export default router;
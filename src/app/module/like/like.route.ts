import { Router } from "express";
import { LikeController } from "./like.controller";
import auth from "../../middleware/auth";


const router = Router();


router.post("/", auth("user", "admin"),  LikeController.toggleLike);
router.get("/post/:postId",auth("user","admin"), LikeController.getLikesByPost);
export const likeRoutes = router;

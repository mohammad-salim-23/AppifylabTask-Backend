import { Router } from "express";
import { LikeController } from "./like.controller";
import auth from "../../middleware/auth";


const router = Router();


router.post("/", auth("user", "admin"),  LikeController.toggleLike);

export const likeRoutes = router;

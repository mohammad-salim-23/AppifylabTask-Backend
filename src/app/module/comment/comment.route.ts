import { Router } from "express";
import { CommentController } from "./comment.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { z } from "zod";

const router = Router();

const addCommentSchema = z.object({
  body: z.object({
    postId: z.string().min(1),
    text: z.string().min(1),
    parentComment: z.string().optional()
  })
});


// add comment / reply
router.post("/", auth("user","admin"), validateRequest(addCommentSchema), CommentController.addComment);

// get top-level comments for a post 
router.get("/:postId", auth("user","admin"), CommentController.getComments);
//get reply
router.get("/replies/:commentId", auth("user","admin"), CommentController.getReplies);

router.patch("/:commentId",auth("user","admin"),
CommentController.updateComment);

router.delete("/:commentId",auth("user","admin"),
CommentController.deleteComment)

export const commentRoutes = router;

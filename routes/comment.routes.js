const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
const authMiddleWare = require("../middlewares/auth-middleware");

router.post(
  "/:worldcup_id/comments",
  authMiddleWare,
  commentsController.createComment
);
router.get("/:worldcup_id/comments", commentsController.findAllComments);
router.put(
  "/:worldcup_id/comments/:comment_id",
  authMiddleWare,
  commentsController.updateComment
);
router.delete(
  "/:worldcup_id/comments/:comment_id",
  authMiddleWare,
  commentsController.deleteComment
);

module.exports = router;

const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

router.post("/:worldcup_id/comments", commentsController.createComment);
router.get("/:worldcup_id/comments", commentsController.findAllComments);
router.put(
  "/:worldcup_id/comments/:comment_id",
  commentsController.updateComment
);
router.delete(
  "/:worldcup_id/comments/:comment_id",
  commentsController.deleteComment
);

module.exports = router;

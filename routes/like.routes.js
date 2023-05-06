const express = require("express");
const router = express.Router();
const LikesController = require("../controllers/likes.controller");
const likescontroller = new LikesController();
const authMiddleWare = require("../middlewares/auth-middleware");

router.put(
  "/:worldcup_id/likes",
  authMiddleWare,
  likescontroller.worldcupLikeToggle
);

module.exports = router;

const express = require("express");
const router = express.Router();

const worldcupRouter = require("./worldcup.routes");
const authRouter = require("./auth.routes");
const likeRouter = require("./like.routes");
const mypageRouter = require("./mypage.routes");
const commentRouter = require("./comment.routes");

router.use("/worldcup", [worldcupRouter, commentRouter, likeRouter]);
router.use("/auth", [authRouter]);
router.use("/mypage", [mypageRouter]);

module.exports = router;

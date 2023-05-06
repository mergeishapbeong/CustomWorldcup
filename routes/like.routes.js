const express = require("express");
const router = express.Router();
const LikesController = require("../controllers/likes.controller");
const likescontroller = new LikesController();

router.put("/:worldcup_id/likes", likescontroller.worldcupLikeToggle);

module.exports = router;

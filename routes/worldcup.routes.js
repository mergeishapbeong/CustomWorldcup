const express = require("express");
const router = express.Router({ mergeParams: true });
const authMiddleware = require("../middlewares/auth-middleware.js");
const WorldcupController = require("../controllers/worldcup.controller");
const worldcupController = new WorldcupController();

// POST: 월드컵 생성
router.post("/", authMiddleware, worldcupController.createWorldcup);

// GET: 월드컵 전체 조회
router.get("/", worldcupController.getAllWorldcups);

// GET: 월드컵 상세 조회
router.get("/:worldcup_id", worldcupController.getOneWorldcup);

// PUT: 월드컵 수정
router.put("/:worldcup_id", authMiddleware, worldcupController.updateWorldcup);

// DELETE: 월드컵 삭제
router.delete("/:worldcup_id", authMiddleware, worldcupController.deleteWorldcup);

module.exports = router;

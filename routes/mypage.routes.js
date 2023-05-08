const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js");

const MypageController = require('../controllers/mypage.controller');
const mypageController = new MypageController();

router.get('/worldcup', authMiddleware, mypageController.getMyWorldcups);
router.get('/worldcup_results', authMiddleware, mypageController.getMyWorldcupResults);

module.exports = router;
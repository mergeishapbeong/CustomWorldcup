const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const MypageController = require('../controllers/mypage.controller');
const mypageController = new MypageController();

router.get('/', mypageController);
router.get('/worldcup_result', mypageController);
router.get('/worldcup', mypageController);

module.exports = router;

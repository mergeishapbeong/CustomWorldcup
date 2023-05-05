const express = require('express');
const router = express.Router();

const MypageController = require('../controllers/mypage.controller');
const mypageController = new MypageController();

router.get('/worldcup', mypageController.getMyWorldcups);
router.get('/worldcup_result', mypageController.getMyWorldcupResults);

module.exports = router;
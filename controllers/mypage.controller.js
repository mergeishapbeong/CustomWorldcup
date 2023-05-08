const MypageService = require("../services/mypage.service");

class MypageController {
  mypageService = new MypageService();
  
  getMyWorldcups = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const myWorldcups = await this.mypageService.getMyWorldcups(user_id);
      res.status(200).json({ results: myWorldcups });
    } catch (error) {
      next(error, req, res, "내가 만든 월드컵 조회에 실패하였습니다.");
    }
  };

  getMyWorldcupResults = async (req, res, next) => {
    try {
      const { user_id } = res.locals.user;
      const myWorldcupResults = await this.mypageService.getMyWorldcupResults(user_id);
      res.status(200).json({ results: myWorldcupResults });
    } catch (error) {
      next(error, req, res, "월드컵 결과 조회에 실패하였습니다.");
    }
  };
}

module.exports = MypageController;

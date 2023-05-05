const MypageService = require("../services/mypage.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class MypageController {
  mypageService = new MypageService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
  
  getMyWorldcups = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const myWorldcups = await this.mypageService.getMyWorldcups();
    } catch (error) {
      next(error, req, res, "내가 만든 월드컵 조회에 실패하였습니다.");
    }
  };

  // 모델 3개를 가지고 놀아야 되는데 이거 왜 이렇게 해야 하는 걸까?
  getMyWorldcupResults = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const myWorldcupResults = await this.mypageService.getMyWorldcupResults();
    } catch (error) {
      next(error, req, res, "월드컵 결과 조회에 실패하였습니다.");
    }
  };

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.getPosts();
      return res.status(200).json({ posts: posts });
    } catch (error) {
      next(error, req, res, "게시글 조회에 실패하였습니다.");
    }
  };

  // 에러 처리
  errorHandling = (error, req, res, defaultMessage) => {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    console.error(error);

    if (!error.errorCode) {
      return res.status(400).json({ errorMessage: defaultMessage });
    } else {
      return res
        .status(error.errorCode)
        .json({ errorMessage: error.errorMessage });
    }
  };
}

module.exports = MypageController;

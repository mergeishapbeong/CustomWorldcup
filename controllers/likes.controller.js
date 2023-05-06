const LikesService = require("../services/likes.service");
const WorldcupService = require("../services/worldcup.service");

class LikesController {
  likesService = new LikesService();
  worldcupService = new WorldcupService();

  worldcupLikeToggle = async (req, res, next) => {
    try {
      const { worldcup_id } = req.params;
      const { user_id } = res.locals.user;
      // 1. worldcup 존재 여부 확인
      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }
      // 2. like 존재 여부확인
      const likeIsExist = await this.likesService.getUserLiked(
        user_id,
        worldcup_id
      );

      if (likeIsExist) {
        const worldcupLikeToggleData =
          await this.likesService.worldcupLikeToggle(
            user_id,
            worldcup_id,
            true
          );
        console.log(worldcupLikeToggleData);
        return res.status(200).json({ message: "월드컵 좋아요 취소 완료" });
      } else {
        const worldcupLikeToggleData =
          await this.likesService.worldcupLikeToggle(
            user_id,
            worldcup_id,
            false
          );
        return res.status(200).json({ message: "월드컵 좋아요 완료" });
      }
    } catch (error) {
      console.log(error);
      next(error, req, res, "좋아요 설정에 실패하였습니다.");
    }
  };
}

module.exports = LikesController;

const LikesService = require("../services/likes.service");
const WorldcupService = require("../services/worldcup.service");

class LikesController {
  likesService = new LikesService();
  worldcupService = new WorldcupService();

  worldcupLikeToggle = async (req, res) => {
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
        const worldcupLikeToggleData = this.likesService.worldcupLikeToggle(
          user_id,
          worldcup_id,
          true
        );
        return res.status(200).json(worldcupLikeToggleData);
      } else {
        const worldcupLikeToggleData = this.likesService.worldcupLikeToggle(
          user_id,
          worldcup_id,
          false
        );
        return res.status(200).json(worldcupLikeToggleData);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = LikesController;

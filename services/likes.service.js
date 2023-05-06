const LikesRepository = require("../repositories/likes.repository");
const { Likes, Worldcups } = require("../models/index");
const WorldcupRepository = require("../repositories/worldcup.repository");
class LikesService {
  likesRepository = new LikesRepository(Likes);
  worldcupRepository = new WorldcupRepository(Worldcups);

  getUserLiked = async (user_id, worldcup_id) => {
    const getUserLikedData = this.likesRepository.getUserLiked(
      user_id,
      worldcup_id
    );
    return getUserLikedData;
  };

  worldcupLikeToggle = async (user_id, worldcup_id, isExistWorldcup) => {
    if (isExistWorldcup) {
      // 2-1. 존재하면 삭제 및 decrease
      const deleteLikeData = this.likesRepository.deleteLike(
        user_id,
        worldcup_id
      );

      const decreaseLikesData =
        this.worldcupRepository.decreaseLikes(worldcup_id);
      console.log("deleteLikeData", deleteLikeData);
      console.log("decreaseLikesData", decreaseLikesData);
      return { message: "월드컵 좋아요 완료" };
    } else {
      // 2-2. 존재하지 않으면 생성 및 increase
      const createLikeData = this.likesRepository.createLike(
        user_id,
        worldcup_id
      );

      const increaseLikesData =
        this.worldcupRepository.increaseLikes(worldcup_id);

      console.log("createLikeData", createLikeData);
      console.log("increaseLikesData", increaseLikesData);
      return { message: "월드컵 좋아요 취소 완료" };
    }
  };
}

module.exports = LikesService;

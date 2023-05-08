const LikesRepository = require("../repositories/likes.repository");
const { Likes, Worldcups } = require("../models/index");
const WorldcupRepository = require("../repositories/worldcup.repository");
const { sequelize } = require("../models");
const { Transaction } = require("sequelize");

class LikesService {
  likesRepository = new LikesRepository(Likes);
  worldcupRepository = new WorldcupRepository(Worldcups);

  getUserLiked = async (user_id, worldcup_id) => {
    const getUserLikedData = await this.likesRepository.getUserLiked(
      user_id,
      worldcup_id
    );
    return getUserLikedData;
  };

  worldcupLikeToggle = async (user_id, worldcup_id, isExistWorldcup) => {
    await sequelize.transaction(
      { isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        if (isExistWorldcup) {
          // 2-1. 존재하면 삭제 및 decrease
          const deleteLikeData = await this.likesRepository.deleteLike(
            user_id,
            worldcup_id
          );

          const decreaseLikesData = await this.worldcupRepository.decreaseLikes(
            worldcup_id
          );
          console.log("deleteLikeData", deleteLikeData);
          console.log("decreaseLikesData", decreaseLikesData);
          return { message: "월드컵 취소 좋아요 완료" };
        } else {
          // 2-2. 존재하지 않으면 생성 및 increase
          const createLikeData = await this.likesRepository.createLike(
            user_id,
            worldcup_id
          );

          const increaseLikesData = await this.worldcupRepository.increaseLikes(
            worldcup_id
          );

          console.log("createLikeData", createLikeData);
          console.log("increaseLikesData", increaseLikesData);
          return { message: "월드컵 좋아요 완료" };
        }
      }
    );
  };
}

module.exports = LikesService;

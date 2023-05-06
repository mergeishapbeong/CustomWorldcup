const { Op } = require("sequelize");

class LikesRepository {
  constructor(likesModel) {
    this.Likes = likesModel;
  }

  getUserLiked = async (user_id, worldcup_id) => {
    const getUserLikedData = await this.Likes.findOne({
      where: {
        [Op.and]: [{ worldcup_id }, { user_id }],
      },
    });
    return getUserLikedData;
  };

  deleteLike = async (user_id, worldcup_id) => {
    const deleteLikeData = await this.Likes.destroy({
      where: { [Op.and]: [{ user_id }, { worldcup_id }] },
    });
    return deleteLikeData;
  };

  createLike = async (user_id, worldcup_id) => {
    const createLikeData = await this.Likes.create({ user_id, worldcup_id });
    return createLikeData;
  };
}

module.exports = LikesRepository;

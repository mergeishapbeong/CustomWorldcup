const { Op } = require("sequelize");

class LikesRepository {
  constructor(likesModel) {
    this.Likes = likesModel;
  }

  getUserLiked = async (user_id, worldcup_id) => {
    const getUserLikedData = this.Likes.find({
      where: {
        [Op.and]: [{ worldcup_id }, { user_id }],
      },
    });
    return getUserLikedData;
  };

  deleteLike = async (user_id, worldcup_id) => {
    const deleteLikeData = this.Likes.destroy({
      where: { [Op.and]: [{ user_id }, { worldcup_id }] },
    });
    return deleteLikeData;
  };

  createLike = async (user_id, worldcup_id) => {
    const createLikeData = this.Likes.create({ user_id, worldcup_id });
    return createLikeData;
  };
}

module.exports = LikesRepository;

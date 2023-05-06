const { Op } = require("sequelize");

class CommentsRepository {
  constructor(commentsModel) {
    this.Comments = commentsModel;
  }

  createComment = async (comment, worldcup_id, user_id) => {
    const createCommentData = await this.Comments.create({
      comment,
      worldcup_id,
      user_id,
    });
    return createCommentData;
  };

  findAllComments = async (worldcup_id) => {
    const allComments = await this.Comments.findAll({ where: { worldcup_id } });

    return allComments;
  };

  findOneComment = async (comment_id) => {
    const findOneCommentData = await this.Comments.findOne({
      where: { comment_id: comment_id },
    });
    return findOneCommentData;
  };

  updateComment = async (comment, worldcup_id, comment_id) => {
    const updateCommentData = await this.Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ worldcup_id }, { comment_id }],
        },
      }
    );
    return updateCommentData;
  };

  deleteComment = async (worldcup_id, comment_id, user_id) => {
    const deleteCommentData = await this.Comments.destroy({
      where: { [Op.and]: [{ worldcup_id }, { comment_id }, { user_id }] },
    });

    return deleteCommentData;
  };
}

module.exports = CommentsRepository;

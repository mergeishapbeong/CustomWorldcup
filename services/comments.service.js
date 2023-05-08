const CommentsRepository = require("../repositories/comments.repository");
const { Comments } = require("../models/index");

class CommentsService {
  commentsRepository = new CommentsRepository(Comments);

  createComment = async (comment, worldcup_id, user_id) => {
    const createCommentData = await this.commentsRepository.createComment(
      comment,
      worldcup_id,
      user_id
    );
    console.log("createCommentData: ", createCommentData);
    return { message: "댓글 작성 완료" };
  };

  findAllComments = async (worldcup_id) => {
    const findAllCommentsData = await this.commentsRepository.findAllComments(
      worldcup_id
    );
    // console.log(findAllCommentsData);
    return findAllCommentsData;
  };

  findOneComment = async (comment_id) => {
    const findOneCommentData = await this.commentsRepository.findOneComment(
      comment_id
    );

    return findOneCommentData;
  };

  updateComment = async (comment, worldcup_id, comment_id) => {
    const updateCommentData = await this.commentsRepository.updateComment(
      comment,
      worldcup_id,
      comment_id
    );
    console.log("updateCommentData: ", updateCommentData);
    return { message: "댓글 수정 완료" };
  };

  deleteComment = async (worldcup_id, comment_id, user_id) => {
    const deleteCommentData = await this.commentsRepository.deleteComment(
      worldcup_id,
      comment_id,
      user_id
    );
    console.log("deleteCommentData: ", deleteCommentData);
    return { message: "댓글 삭제 완료" };
  };
}

module.exports = CommentsService;

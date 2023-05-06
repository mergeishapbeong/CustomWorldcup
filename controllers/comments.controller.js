const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();
  // worldcupService 추가 예정

  createComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const { worldcup_id } = req.params;
      const { user_id } = res.locals.user;
      // worldcup이 있는지 조회하여 오류처리 (미작성)

      const createCommentData = await this.commentsService.createComment(
        comment,
        worldcup_id,
        user_id
      );

      return res.status(200).json(createCommentData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  findAllComments = async (req, res) => {
    try {
      const { worldcup_id } = req.params;

      // worldcup이 있는지 조회하여 오류처리 (미작성)

      const findAllCommentsData = await this.commentsService.findAllComments(
        worldcup_id
      );

      res.status(200).json(findAllCommentsData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error.message });
    }
  };
  updateComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const { worldcup_id, comment_id } = req.params;
      // worldcup이 있는지 조회하여 오류처리 (미작성)

      const updateCommentData = await this.commentsService.updateComment(
        comment,
        worldcup_id,
        comment_id
      );
      return res.status(200).json(updateCommentData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error.message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { worldcup_id, comment_id } = req.params;
      const { user_id } = res.locals.user;
      // worldcup이 있는지 조회하여 오류처리 (미작성)
      // 유저 정보 확인 (미작성)

      const deleteCommentData = await this.commentsService.deleteComment(
        worldcup_id,
        comment_id,
        user_id
      );

      return res.status(200).json(deleteCommentData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = CommentsController;

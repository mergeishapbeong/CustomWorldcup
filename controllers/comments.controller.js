const CommentsService = require("../services/comments.service");
const WorldcupService = require("../services/worldcup.service");
class CommentsController {
  commentsService = new CommentsService();
  worldcupService = new WorldcupService();

  createComment = async (req, res) => {
    try {
      const { comment } = req.body;
      const { worldcup_id } = req.params;
      const { user_id } = res.locals.user;

      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }
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

      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }
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
      const { user_id } = res.locals.user;
      // user 정보가 맞는지 조회하여 오류처리 (미작성)
      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }
      const updateCommentData = await this.commentsService.updateComments(
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
      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }

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

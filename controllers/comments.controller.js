const CommentsService = require("../services/comments.service");
const WorldcupService = require("../services/worldcup.service");
const { createCommentSchema, updateCommentSchema } = require("./joi");
class CommentsController {
  commentsService = new CommentsService();
  worldcupService = new WorldcupService();

  createComment = async (req, res, next) => {
    try {
      const { value, error } = createCommentSchema.validate(req.body);
      // validation 에러 처리
      if (error) {
        error.errorCode = 412;
        next(error, req, res, error.message);
      }

      const { worldcup_id } = req.params;
      const { user_id } = res.locals.user;
      console.log(value.comment, worldcup_id, user_id);

      const worldcupIsExist = await this.worldcupService.getOneWorldcup(
        worldcup_id
      );
      if (!worldcupIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "게시글이 존재하지 않습니다." });
      }

      const createCommentData = await this.commentsService.createComment(
        value.comment,
        worldcup_id,
        user_id
      );

      return res.status(200).json(createCommentData);
    } catch (error) {
      console.log(error);
      next(error, req, res, "댓글 작성에 실패하였습니다.");
    }
  };

  findAllComments = async (req, res, next) => {
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
      next(error, req, res, "댓글 조회에 실패하였습니다.");
    }
  };
  updateComment = async (req, res, next) => {
    try {
      const { value, error } = updateCommentSchema.validate(req.body);
      // validation 에러 처리
      if (error) {
        error.errorCode = 412;
        next(error, req, res, error.message);
      }

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
      const commentIsExist = await this.commentsService.findOneComment(
        comment_id
      );
      console.log("commentIsExist", commentIsExist);
      if (!commentIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "댓글이 존재하지 않습니다." });
      }

      if (commentIsExist.user_id !== user_id) {
        return res
          .status(403)
          .json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
      }
      const updateCommentData = await this.commentsService.updateComment(
        value.comment,
        worldcup_id,
        comment_id
      );
      return res.status(200).json(updateCommentData);
    } catch (error) {
      console.log(error);
      next(error, req, res, "댓글 수정에 실패하였습니다.");
    }
  };

  deleteComment = async (req, res, next) => {
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

      const commentIsExist = await this.commentsService.findOneComment(
        comment_id
      );
      if (!commentIsExist) {
        return res
          .status(404)
          .json({ errorMessage: "댓글이 존재하지 않습니다." });
      }

      if (commentIsExist.user_id !== user_id) {
        return res
          .status(403)
          .json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
      }

      const deleteCommentData = await this.commentsService.deleteComment(
        worldcup_id,
        comment_id,
        user_id
      );

      return res.status(200).json(deleteCommentData);
    } catch (error) {
      console.log(error);
      next(error, req, res, "댓글 삭제에 실패하였습니다.");
    }
  };
}

module.exports = CommentsController;

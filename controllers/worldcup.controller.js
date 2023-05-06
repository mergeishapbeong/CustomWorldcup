const WorldcupService = require("../services/worldcup.service");
const { postWorldcupSchema, updateWorldcupSchema } = require("./joi");

class WorldcupController {
  worldcupService = new WorldcupService();

  createWorldcup = async (req, res) => {
    const { title, content, choices } = await postWorldcupSchema
      .validateAsync(req.body)
      .catch((error) => {
        console.error(error);
        return res.status(412).json({ errorMessage: error.message });
      });
    const user_id = 1;
    // const { user_id } = res.locals.user;

    try {
      await this.worldcupService.createWorldcup(
        user_id,
        title,
        content,
        choices
      );
      res.status(201).json({ message: "월드컵 작성 완료" });
    } catch (error) {
      next(error, req, res, "월드컵 생성에 실패하였습니다.");
    }
  };

  getAllWorldcups = async (req, res) => {
    try {
      const worldcups = await this.worldcupService.getAllWorldcups();
      res.status(200).json({ worldcups });
    } catch (error) {
      next(error, req, res, "전체 월드컵 조회에 실패하였습니다.");
    }
  };

  getOneWorldcup = async (req, res) => {
    const { worldcup_id } = req.params;
    try {
      const worldcup = await this.worldcupService.getOneWorldcup(worldcup_id);
      res.status(200).json({ worldcup });
    } catch (error) {
      next(error, req, res, "월드컵 조회에 실패하였습니다.");
    }
  };

  updateWorldcup = async (req, res) => {
    const { title, content } = await updateWorldcupSchema
      .validateAsync(req.body)
      .catch((error) => {
        console.error(error);
        return res.status(412).json({ errorMessage: error.message });
      });
    const { worldcup_id } = req.params;
    const user_id = 1;
    // const { user_id } = res.locals.user;
    try {
      await this.worldcupService.updateWorldcup(
        title,
        content,
        worldcup_id,
        user_id
      );
      res.status(200).json({ message: "월드컵 수정 완료" });
    } catch (error) {
      next(error, req, res, "월드컵 수정에 실패하였습니다.");
    }
  };

  deleteWorldcup = async (req, res) => {
    const { worldcup_id } = req.params;
    const user_id = 1;
    // const { user_id } = res.locals.user;

    try {
      await this.worldcupService.deleteWorldcup(worldcup_id, user_id);
      res.status(200).json({ message: "월드컵 삭제 완료" });
    } catch (error) {
      next(error, req, res, "월드컵 삭제에 실패하였습니다.");
    }
  };
}

module.exports = WorldcupController;

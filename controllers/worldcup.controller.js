const WorldcupService = require("../services/worldcup.service");
const { postWorldcupSchema, updateWorldcupSchema } = require("./joi");

class WorldcupController {
  worldcupService = new WorldcupService();

  createWorldcup = async (req, res, next) => {
    const { value, error } = await postWorldcupSchema.validate(req.body);

    const { user_id } = res.locals.user;

    try {
      const newWorldcup = await this.worldcupService.createWorldcup(
        user_id,
        value.title,
        value.content,
        value.choices
      );
      res.status(201).json({ newWorldcup });
    } catch (error) {
      next(error, req, res, "월드컵 생성에 실패하였습니다.");
    }
  };

  getAllWorldcups = async (req, res, next) => {
    try {
      const worldcups = await this.worldcupService.getAllWorldcups();
      res.status(200).json({ worldcups });
    } catch (error) {
      next(error, req, res, "전체 월드컵 조회에 실패하였습니다.");
    }
  };

  getOneWorldcup = async (req, res, next) => {
    const { worldcup_id } = req.params;
    try {
      const worldcup = await this.worldcupService.getOneWorldcup(worldcup_id);
      res.status(200).json({ worldcup });
    } catch (error) {
      next(error, req, res, "월드컵 조회에 실패하였습니다.");
    }
  };

  updateWorldcup = async (req, res, next) => {
    const { title, content } = await updateWorldcupSchema
      .validateAsync(req.body)
      .catch((error) => {
        error.errorCode = 412;
        next(error, req, res, error.message);
      });
    const { worldcup_id } = req.params;
    const { user_id } = res.locals.user;
    try {
      const updatedWorldcup = await this.worldcupService.updateWorldcup(
        title,
        content,
        worldcup_id,
        user_id
      );

      res.status(200).json({ updatedWorldcup });
    } catch (error) {
      next(error, req, res, "월드컵 수정에 실패하였습니다.");
    }
  };

  deleteWorldcup = async (req, res, next) => {
    const { worldcup_id } = req.params;
    const { user_id } = res.locals.user;
    try {
      await this.worldcupService.deleteWorldcup(worldcup_id, user_id);
      res.status(200).json({ message: "월드컵 삭제 완료" });
    } catch (error) {
      next(error, req, res, "월드컵 삭제에 실패하였습니다.");
    }
  };

  postWorldcupResult = async (req, res, next) => {
    try {
      const { worldcup_id } = req.params;
      const { user_id } = res.locals.user;
      const { worldcup_choice_id } = req.body;
      const worldcupResultData = { worldcup_id, user_id, worldcup_choice_id };
      console.log("worldcupResultData", worldcupResultData);

      await this.worldcupService.postWorldcupResult(worldcupResultData);
      res.status(200).json({ message: "월드컵 결과 저장 완료" });
    } catch (error) {
      next(error, req, res, "월드컵 결과 저장에 실패하였습니다.");
    }
  };
}

module.exports = WorldcupController;

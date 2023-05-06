const WorldcupService = require("../services/worldcup.service");
const { postWorldcupSchema } = require("./joi");

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

    const newWorldcup = await this.worldcupService.createWorldcup(
      user_id,
      title,
      content
    );
    const worldcup_id = newWorldcup.dataValues.worldcup_id;
    await Promise.all(
      choices.map(async (choice) => {
        await this.worldcupService.createWorldcupChoice(
          worldcup_id,
          choice.choice_name,
          choice.choice_url
        );
      })
    );
    res.status(201).json({ message: "월드컵 작성 완료" });
  };

  getAllWorldcups = async (req, res) => {
    const worldcups = await this.worldcupService.getAllWorldcups();
    res.status(200).json({ worldcups });
  };

  getOneWorldcup = async (req, res) => {
    const { worldcup_id } = req.params;
    const worldcup = await this.worldcupService.getOneWorldcup(worldcup_id);
    res.status(200).json({ worldcup });
  };

  updateWorldcup = async (req, res) => {
    const { title, content } = req.body;
    const { worldcup_id } = req.params;
    const user_id = 1;
    // const { user_id } = res.locals.user;

    await this.worldcupService.updateWorldcup(
      title,
      content,
      worldcup_id,
      user_id
    );

    res.status(200).json({ message: "월드컵 수정 완료" });
  };

  deleteWorldcup = async (req, res) => {
    const { worldcup_id } = req.params;
    const user_id = 1;
    // const { user_id } = res.locals.user;

    await this.worldcupService.deleteWorldcup(worldcup_id, user_id);

    res.status(200).json({ message: "월드컵 삭제 완료" });
  };
}

module.exports = WorldcupController;

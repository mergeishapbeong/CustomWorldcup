const WorldcupService = require("../services/worldcup.service");

class WorldcupController {
  worldcupService = new WorldcupService();

  createWorldcup = async (req, res) => {
    const { title, content, choices } = req.body;
    const user_id = 1;
    // const { user_id } = res.locals.user;

    const newWorldcup = await this.worldcupService.createWorldcup(
      user_id,
      title,
      content
    );
    console.log(newWorldcup);
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

  getAllWorldcups = async (req, res) => {};

  getOneWorldcup = async (req, res) => {};

  updateWorldcup = async (req, res) => {};

  deleteWorldcup = async (req, res) => {};
}

module.exports = WorldcupController;

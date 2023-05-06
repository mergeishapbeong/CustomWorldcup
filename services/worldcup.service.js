const WorldcupRepository = require("../repositories/worldcup.repository");
const WorldcupChoiceRepository = require("../repositories/worldcup.choice.repository");
const { Worldcups, Worldcup_choices } = require("../models");

class WorldcupService {
  worldcupRepository = new WorldcupRepository(Worldcups, Worldcup_choices);
  worldcupChoiceRepository = new WorldcupChoiceRepository(Worldcup_choices);

  createWorldcup = async (user_id, title, content, choices) => {
    const newWorldcup = await this.worldcupRepository.create(
      user_id,
      title,
      content
    );
    const worldcup_id = newWorldcup.dataValues.worldcup_id;
    await Promise.all(
      choices.map(async (choice) => {
        await this.worldcupChoiceRepository.createChoice(
          worldcup_id,
          choice.choice_name,
          choice.choice_url
        );
      })
    );
  };

  getAllWorldcups = async () => {
    return await this.worldcupRepository.getAll();
  };

  getOneWorldcup = async (worldcup_id) => {
    return await this.worldcupRepository.getOne(worldcup_id);
  };

  updateWorldcup = async (title, content, worldcup_id, user_id) => {
    await this.worldcupRepository.update(title, content, worldcup_id, user_id);
  };

  deleteWorldcup = async (worldcup_id, user_id) => {
    await this.worldcupRepository.remove(worldcup_id, user_id);
  };
}

module.exports = WorldcupService;

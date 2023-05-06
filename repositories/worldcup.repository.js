const { Op } = require("sequelize");

class WorldcupRepository {
  constructor(WorldcupsModel, WorldcupChoicesModel) {
    this.worldcupsModel = WorldcupsModel;
    this.worldcupChoicesModel = WorldcupChoicesModel;
  }

  createWorldcup = async (user_id, title, content) => {
    return await this.worldcupsModel.create({ user_id, title, content });
  };

  createWorldcupChoice = async (worldcup_id, choice_name, choice_url) => {
    await this.worldcupChoicesModel.create({
      worldcup_id,
      choice_name,
      choice_url,
    });
  };
}

module.exports = WorldcupRepository;

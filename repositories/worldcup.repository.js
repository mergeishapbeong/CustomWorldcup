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

  getAllWorldcups = async () => {
    return await this.worldcupsModel.findAll({
      order: [["createdAt", "DESC"]],
    });
  };

  getOneWorldcup = async (worldcup_id) => {
    return await this.worldcupsModel.findAll({
      where: { worldcup_id },
    });
  };

  updateWorldcup = async (title, content, worldcup_id, user_id) => {
    await this.worldcupsModel.update(
      { title, content },
      { where: { [Op.and]: [{ worldcup_id }, { user_id }] } }
    );
  };

  deleteWorldcup = async (worldcup_id, user_id) => {
    await this.worldcupsModel.destroy({
      where: { [Op.and]: [{ worldcup_id }, { user_id }] },
    });
  };

  findAll = async (userId) => {
    const posts = await this.worldcupsModel.findAll({
      where: { userId },
    });
    return posts;
  };
}

module.exports = WorldcupRepository;

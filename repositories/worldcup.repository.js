const { Op } = require("sequelize");

class WorldcupRepository {
  constructor(WorldcupsModel, WorldcupChoicesModel) {
    this.worldcupsModel = WorldcupsModel;
  }

  create = async (user_id, title, content) => {
    return await this.worldcupsModel.create({ user_id, title, content });
  };

  getAll = async () => {
    return await this.worldcupsModel.findAll({
      order: [["createdAt", "DESC"]],
    });
  };

  getOne = async (worldcup_id) => {
    return await this.worldcupsModel.findAll({
      where: { worldcup_id },
    });
  };

  update = async (title, content, worldcup_id, user_id) => {
    await this.worldcupsModel.update(
      { title, content },
      { where: { [Op.and]: [{ worldcup_id }, { user_id }] } }
    );
  };

  remove = async (worldcup_id, user_id) => {
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

const { Op } = require("sequelize");
const { Transaction } = require("sequelize");
const { sequelize } = require("../models");

class WorldcupRepository {
  constructor(WorldcupsModel, WorldcupChoicesMode) {
    this.worldcupsModel = WorldcupsModel;
    this.worldcupChoicesModel = WorldcupChoicesMode;
  }

  create = async (user_id, title, content, choices) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const newWorldcup = await this.worldcupsModel.create(
        { user_id, title, content },
        {
          transaction: t,
        }
      );
      const worldcup_id = newWorldcup.dataValues.worldcup_id;

      await Promise.all(
        choices.map(async (choice) => {
          await this.worldcupChoicesModel.create(
            {
              worldcup_id,
              choice_name: choice.choice_name,
              choice_url: choice.choice_url,
            },
            {
              transaction: t,
            }
          );
        })
      );
      await t.commit();
      return newWorldcup;
    } catch (error) {
      console.error(error);
      await t.rollback();
    }
  };

  getAll = async () => {
    return await this.worldcupsModel.findAll({
      order: [["createdAt", "DESC"]],
    });
  };

  getOne = async (worldcup_id) => {
    return await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });
  };

  update = async (title, content, worldcup_id, user_id) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    await this.worldcupsModel.update(
      { title, content },
      { where: { [Op.and]: [{ worldcup_id }, { user_id }] } }
    );

    return this.getOne(worldcup_id);
  };

  remove = async (worldcup_id, user_id) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    await this.worldcupsModel.destroy({
      where: { [Op.and]: [{ worldcup_id }, { user_id }] },
    });
  };

  findAll = async (user_id) => {
    const posts = await this.worldcupsModel.findAll({
      where: { user_id },
    });
    return posts;
  };

  decreaseLikes = async (worldcup_id) => {
    const findLikesData = await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });

    const decreaseLikesData = await findLikesData.decrement("likes", { by: 1 });
    return decreaseLikesData;
  };

  increaseLikes = async (worldcup_id) => {
    const findLikesData = await this.worldcupsModel.findOne({
      where: { worldcup_id },
    });

    const increaseLikesData = await findLikesData.increment("likes", { by: 1 });
    return increaseLikesData;
  };
}

module.exports = WorldcupRepository;

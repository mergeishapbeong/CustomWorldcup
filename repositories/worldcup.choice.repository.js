const { Worldcups, Worldcup_choices, Worldcup_results } = require('../models');

class WorldcupChoiceRepository {
  constructor(worldcupChoiceModel) {
    this.worldcupChoiceModel = worldcupChoiceModel;
  }

  findAll = async (userId) => {
    const myWorldcupResults = await this.worldcupChoiceModel.findAll({
      includes: [
        {
          model: Worldcups,
          attributes: ['title'],
        },
        {
          model: Worldcup_results,
          attributes: [],
          where: { userId },
        },
      ],
      attributes: ['choice_name'],
    });
    return myWorldcupResults;
  };
}

module.exports = WorldcupChoiceRepository;

const { Worldcups, Worldcup_choices, Worldcup_results } = require('../models');

class WorldcupChoiceRepository {
  constructor(worldcupChoiceModel) {
    this.worldcupChoiceModel = worldcupChoiceModel;
  }

  findAllMine = async (user_id) => {
    const myWorldcupResults = await this.worldcupChoiceModel.findAll({
      includes: [
        {
          model: Worldcups,
          attributes: ['title'],
        },
        {
          model: Worldcup_results,
          attributes: [],
          where: { user_id },
        },
      ],
      attributes: ['choice_name'],
    });
    return myWorldcupResults;
  };

  createChoice = async (worldcup_id, choice_name, choice_url) => {
    await this.worldcupChoiceModel.create({
      worldcup_id,
      choice_name,
      choice_url,
    });
  };
}

module.exports = WorldcupChoiceRepository;

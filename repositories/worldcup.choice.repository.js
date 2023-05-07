const { Worldcups, Worldcup_choices, Worldcup_results } = require('../models');

class WorldcupChoiceRepository {
  constructor(worldcupChoiceModel) {
    this.worldcupChoiceModel = worldcupChoiceModel;
  }

  findAllMine = async (user_id) => {
    const myWorldcupResults = await this.worldcupChoiceModel.findAll({
      include: [
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
    const results = myWorldcupResults.map(result => ({
      choice_name: result.choice_name,
      title: result.Worldcup.title,
    }));
    return results;
  };

  createChoice = async (worldcup_id, choice_name, choice_url) => {
    await this.worldcupChoiceModel.create({
      worldcup_id,
      choice_name,
      choice_url,
    });
  };

  createResult = async (worldcupResultData) => {
    await Worldcup_results.create(worldcupResultData);
  }
}

module.exports = WorldcupChoiceRepository;

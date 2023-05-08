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

  findOne = async (worldcup_choice_id) => {
    return await this.worldcupsModel.findOne({
      where: { worldcup_choice_id },
    });
  };

  increaseWinCount = async (worldcup_choice_id) => {
    await this.worldcupChoiceModel.increment('win_count', {
      by: 1,
      where: { worldcup_choice_id },
    });
  };
}

module.exports = WorldcupChoiceRepository;

const WorldcupRepository = require('../repositories/worldcup.repository');
const WorldcupChoiceRepository = require('../repositories/worldcup.choice.repository');
const { Worldcups, Worldcup_choices } = require('../models');

class MypageService {
  worldcupRepository = new WorldcupRepository(Worldcups);
  worldcupChoiceRepository = new WorldcupChoiceRepository(Worldcup_choices);

  getMyWorldcups = async (user_id) => {
    const myWorldcups = await this.worldcupRepository.findAll(user_id);
    myWorldcups.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return myWorldcups;
  }

  getMyWorldcupResults = async (user_id) => {
    const myWorldcupResults = await this.worldcupChoiceRepository.findAllMine(user_id);
    myWorldcupResults.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return myWorldcupResults;
  }
}

module.exports = MypageService;
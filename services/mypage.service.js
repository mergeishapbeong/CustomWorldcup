const WorldcupRepository = require('../repositories/worldcup.repository');
const WorldcupChoiceRepository = require('../repositories/worldcup.choice.repository');
const { Worldcups, Worldcup_choices } = require('../models');
const AppError = require('../utils/appError');

class MypageService {
  worldcupRepository = new WorldcupRepository(Worldcups);
  worldcupChoiceRepository = new WorldcupChoiceRepository(Worldcup_choices);

  getMyWorldcups = async () => {
    const myWorldcups = await this.worldcupRepository.findAll();
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return myWorldcups;
  }

  getMyWorldcupResults = async () => {
    const myWorldcupResults = await this.worldcupChoiceRepository.findAll();
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return myWorldcupResults;
  }
}

module.exports = MypageService;
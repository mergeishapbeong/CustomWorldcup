const WorldcupRepository = require("../repositories/worldcup.repository");
const { Worldcups, Worldcup_choices } = require("../models");

class WorldcupService {
    worldcupRepository = new WorldcupRepository(Worldcups, Worldcup_choices);

    createWorldcup = async (user_id, title, content) => {
        return await this.worldcupRepository.createWorldcup(user_id, title, content)
    };

    createWorldcupChoice = async (worldcup_id, choice_name, choice_url) => {
        await this.worldcupRepository.createWorldcupChoice(worldcup_id, choice_name, choice_url)
    }

    getAllWorldcups = async () => {
        return await this.worldcupRepository.getAllWorldcups()
    };

    getOneWorldcup = async (worldcup_id) => {
        return await this.worldcupRepository.getOneWorldcup(worldcup_id);
      };

    updateWorldcup = async (title, content, worldcup_id, user_id) => {
        await this.worldcupRepository.updateWorldcup(title, content, worldcup_id, user_id)
    };

    deleteWorldcup = async (worldcup_id, user_id) => {
        await this.worldcupRepository.deleteWorldcup(worldcup_id, user_id)
    };
}

module.exports = WorldcupService;
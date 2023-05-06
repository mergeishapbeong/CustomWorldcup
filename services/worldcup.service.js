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

    };

    getOneWorldcup = async () => {

    };

    updateWorldcup = async () => {

    };

    deleteWorldcup = async () => {
        
    };
}

module.exports = WorldcupService;
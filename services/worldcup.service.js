const WorldcupRepository = require("../repositories/worldcup.repository");
const { Worldcups, Worldcup_choices } = require("../models");

class WorldcupService {
  worldcupRepository = new WorldcupRepository(Worldcups, Worldcup_choices);

  createWorldcup = async (user_id, title, content, choices) => {
    const newWorldcup = await this.worldcupRepository.create(
      user_id,
      title,
      content, 
      choices
    );

    const createdWorldcup = {
      worldcup_id: newWorldcup.dataValues.worldcup_id,
      user_id,
      title,
      content,
      choices
    }
    return createdWorldcup;
  };

  getAllWorldcups = async () => {
    const allWorldcups = await this.worldcupRepository.getAll();
    if (allWorldcups.length === 0) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
    return allWorldcups;
  };

  getOneWorldcup = async (worldcup_id) => {
    const worldcup = await this.worldcupRepository.getOne(worldcup_id);
    if (!worldcup) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
    return worldcup;
  };

  updateWorldcup = async (title, content, worldcup_id, user_id) => {
    const worldcup = await this.worldcupRepository.getOne(worldcup_id);
    if(!worldcup) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
		if(worldcup.user_id !== user_id) {
      const error = new Error();
      error.errorCode = 403;
      error.message = "월드컵 게시물 수정 권한이 없습니다.";
      throw error;
    }


    const updatedWorldcup = await this.worldcupRepository.update(title, content, worldcup_id, user_id);
    
    return {
      worldcup_id: updatedWorldcup.worldcup_id,
      title: updatedWorldcup.title,
      content: updatedWorldcup.content,
    }
  };

  deleteWorldcup = async (worldcup_id, user_id) => {
    const worldcup = await this.worldcupRepository.getOne(worldcup_id);
    if(!worldcup) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
    console.log("log", worldcup.user_id,user_id);
		if(worldcup.user_id !== user_id) {
      const error = new Error();
      error.errorCode = 403;
      error.message = "월드컵 게시물 삭제 권한이 없습니다.";
      throw error;
    }

    await this.worldcupRepository.remove(worldcup_id, user_id);
  };
}

module.exports = WorldcupService;

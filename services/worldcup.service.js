const WorldcupRepository = require("../repositories/worldcup.repository");
const WorldcupChoicesRepository = require("../repositories/worldcup.choice.repository");
const { Worldcups, Worldcup_choices } = require("../models");
const { Transaction } = require("sequelize");
const { sequelize } = require("../models");

class WorldcupService {
  worldcupRepository = new WorldcupRepository(Worldcups);
  worldcupChoicesRepository = new WorldcupChoicesRepository(Worldcup_choices);

  createWorldcup = async (user_id, title, content, choices) => {
    let createdWorldcup;
    try {
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const newWorldcup = await this.worldcupRepository.create(
            user_id,
            title,
            content
          );

          const worldcup_id = newWorldcup.dataValues.worldcup_id;

          await Promise.all(
            choices.map(async (choice) => {
              await this.worldcupChoicesRepository.createChoice(
                worldcup_id,
                choice.choice_name,
                choice.choice_url
              );
            })
          );

          createdWorldcup = {
            worldcup_id,
            user_id,
            title,
            content,
            choices,
          };
        }
      );
    } catch (error) {
      throw error;
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
    try {
      await sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (t) => {
          const worldcup = await this.worldcupRepository.getOne(worldcup_id);
          if (!worldcup) {
            const error = new Error();
            error.errorCode = 404;
            error.message = "월드컵 게시물이 존재하지 않습니다.";
            throw error;
          }
          if (worldcup.user_id !== user_id) {
            const error = new Error();
            error.errorCode = 403;
            error.message = "월드컵 게시물 수정 권한이 없습니다.";
            throw error;
          }

          await this.worldcupRepository.update(
            title,
            content,
            worldcup_id,
            user_id
          );

          return {
            worldcup_id,
            user_id,
            title: worldcup.title,
            content: worldcup.content,
          };
        }
      );
    } catch (error) {
      throw error;
    }
  };

  deleteWorldcup = async (worldcup_id, user_id) => {
    const worldcup = await this.worldcupRepository.getOne(worldcup_id);
    if (!worldcup) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
    console.log("log", worldcup.user_id, user_id);
    if (worldcup.user_id !== user_id) {
      const error = new Error();
      error.errorCode = 403;
      error.message = "월드컵 게시물 삭제 권한이 없습니다.";
      throw error;
    }

    await this.worldcupRepository.remove(worldcup_id, user_id);
  };

  postWorldcupResult = async (worldcupResultData) => {
    console.log("worldcupResultData", worldcupResultData);
    // 월드컵 존재 확인
    const worldcup = await this.worldcupRepository.getOne(
      worldcupResultData.worldcup_id
    );
    if (!worldcup) {
      const error = new Error();
      error.errorCode = 404;
      error.message = "월드컵 게시물이 존재하지 않습니다.";
      throw error;
    }
    // 월드컵 결과 저장
    await this.worldcupChoiceRepository.createResult(worldcupResultData);
  };
}

module.exports = WorldcupService;

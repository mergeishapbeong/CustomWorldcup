class WorldcupRepository {
  constructor(worldcupModel) {
    this.worldcupModel = worldcupModel;
  }

  findAll = async (userId) => {
    const posts = await this.worldcupModel.findAll({
      where: { userId },
    });
    return posts;
  };
}

module.exports = WorldcupRepository;

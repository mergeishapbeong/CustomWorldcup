const Likesrepository = require("../../../repositories/likes.repository");
const { Op } = require("sequelize");

// 가상 모델 생성
let mockLikesModel = {
  findOne: jest.fn(),
  destroy: jest.fn(),
  create: jest.fn(),
};

let likesRepository = new Likesrepository(mockLikesModel);

describe("Likesrepository Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("create success test", async () => {
    mockLikesModel.create = jest.fn(() => {
      return "created";
    });
    const LikesBody = {
      user_id: 1,
      worldcup_id: 1,
    };

    const createLikeData = await likesRepository.createLike(
      LikesBody.worldcup_id,
      LikesBody.user_id
    );

    expect(mockLikesModel.create).toHaveBeenCalledTimes(1);

    expect(createLikeData).toEqual("created");
    expect(mockLikesModel.create).toHaveBeenCalledWith({
      user_id: LikesBody.user_id,
      worldcup_id: LikesBody.worldcup_id,
    });
  });

  test("findOne success test", async () => {
    mockLikesModel.findOne = jest.fn(() => {
      return "findOne";
    });
    const LikesBody = {
      worldcup_id: 1,
      user_id: 1,
    };

    const findOneLikeData = await likesRepository.getUserLiked(
      LikesBody.worldcup_id,
      LikesBody.user_id
    );

    expect(mockLikesModel.findOne).toHaveBeenCalledTimes(1);

    expect(findOneLikeData).toEqual("findOne");
    expect(mockLikesModel.findOne).toHaveBeenCalledWith({
      where: {
        [Op.and]: [
          { worldcup_id: LikesBody.worldcup_id },
          { user_id: LikesBody.user_id },
        ],
      },
    });
  });

  test("destroy success test", async () => {
    mockLikesModel.destroy = jest.fn(() => {
      return "destroy";
    });
    const LikesBody = {
      user_id: 4,
      worldcup_id: 12,
    };

    const destoryLikeData = await likesRepository.deleteLike(
      LikesBody.user_id,
      LikesBody.worldcup_id
    );

    expect(mockLikesModel.destroy).toHaveBeenCalledTimes(1);

    expect(destoryLikeData).toEqual("destroy");
    expect(mockLikesModel.destroy).toHaveBeenCalledWith({
      where: {
        [Op.and]: [
          { user_id: LikesBody.user_id },
          { worldcup_id: LikesBody.worldcup_id },
        ],
      },
    });
  });
});

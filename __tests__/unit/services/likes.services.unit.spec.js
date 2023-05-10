const LikesService = require("../../../services/likes.service");

let mockLikesRepository = {
  getUserLiked: jest.fn(),
  createLike: jest.fn(),
  deleteLike: jest.fn(),
};

let mockWorldcupRepository = {
  decreaseLikes: jest.fn(),
  increaseLikes: jest.fn(),
};

let likesService = new LikesService();
// postService의 Repository를 Mock Repository로 변경합니다.
likesService.likesRepository = mockLikesRepository;
likesService.worldcupRepository = mockWorldcupRepository;

describe("Likes Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Likes Service getUserLiked Method", async () => {
    const getUserLikedReturnValue = { user: "유저 정보" };

    const getUserLikedBody = {
      user_id: 2,
      worldcup_id: 1,
    };

    mockLikesRepository.getUserLiked = jest.fn(() => {
      return getUserLikedReturnValue;
    });

    const getUserLikedData = await likesService.getUserLiked(
      getUserLikedBody.user_id,
      getUserLikedBody.worldcup_id
    );

    expect(getUserLikedData).toEqual({ user: "유저 정보" });

    expect(mockLikesRepository.getUserLiked).toHaveBeenCalledTimes(1);
  });

  test("Comments Service worldcupLikeToggle isExist false Method", async () => {
    const worldcupLikeToggleParams = {
      user_id: 2,
      worldcup_id: 1,
      isExistWorldcup: false,
    };

    mockLikesRepository.createLike = jest.fn(() => {});

    mockWorldcupRepository.increaseLikes = jest.fn(() => {});

    const worldcupLikeToggleData = await likesService.worldcupLikeToggle(
      worldcupLikeToggleParams.user_id,
      worldcupLikeToggleParams.worldcup_id,
      worldcupLikeToggleParams.isExistWorldcup
    );
    expect(mockLikesRepository.createLike).toHaveBeenCalledTimes(1);
    expect(mockWorldcupRepository.increaseLikes).toHaveBeenCalledTimes(1);

    expect(worldcupLikeToggleData).toEqual(undefined);
  });

  test("Comments Service worldcupLikeToggle isExist true Method", async () => {
    const worldcupLikeToggleParams = {
      user_id: 2,
      worldcup_id: 1,
      isExistWorldcup: true,
    };

    mockLikesRepository.deleteLike = jest.fn(() => {});

    mockWorldcupRepository.decreaseLikes = jest.fn(() => {});

    const worldcupLikeToggleData = await likesService.worldcupLikeToggle(
      worldcupLikeToggleParams.user_id,
      worldcupLikeToggleParams.worldcup_id,
      worldcupLikeToggleParams.isExistWorldcup
    );
    expect(mockLikesRepository.deleteLike).toHaveBeenCalledTimes(1);
    expect(mockWorldcupRepository.decreaseLikes).toHaveBeenCalledTimes(1);

    expect(worldcupLikeToggleData).toEqual(undefined);
  });
});

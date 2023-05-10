const LikesController = require("../../../controllers/likes.controller");

let mockLikesService = {
  getUserLiked: jest.fn(),
  worldcupLikeToggle: jest.fn(),
};

let mockWorldcupService = {
  getOneWorldcup: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: {
    user: {},
  },
};

let mockNext = jest.fn();

let likesController = new LikesController();
likesController.likesService = mockLikesService;
likesController.worldcupService = mockWorldcupService;

describe("Layered Architecture Pattern Likes Controller Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("Likes Controller worldcupLikeToggle Method isExist true by Success", async () => {
    const worldcupLikeToggleRequestParams = {
      worldcup_id: 11,
    };
    const worldcupLikeToggleResLocals = {
      user_id: 4,
    };

    mockRequest.params = worldcupLikeToggleRequestParams;
    mockResponse.locals.user = worldcupLikeToggleResLocals;

    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });

    mockLikesService.getUserLiked = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });

    await likesController.worldcupLikeToggle(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
    expect(mockLikesService.worldcupLikeToggle).toHaveBeenCalledTimes(1);
    expect(mockLikesService.getUserLiked).toHaveBeenCalledTimes(1);
    expect(mockLikesService.worldcupLikeToggle).toHaveBeenCalledWith(
      worldcupLikeToggleResLocals.user_id,
      worldcupLikeToggleRequestParams.worldcup_id,
      true
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "월드컵 좋아요 취소 완료",
    });
  });

  test("Likes Controller worldcupLikeToggle Method isExist false by Success", async () => {
    const worldcupLikeToggleRequestParams = {
      worldcup_id: 11,
    };
    const worldcupLikeToggleResLocals = {
      user_id: 4,
    };

    mockRequest.params = worldcupLikeToggleRequestParams;
    mockResponse.locals.user = worldcupLikeToggleResLocals;

    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });

    mockLikesService.getUserLiked = jest.fn(() => {
      return undefined;
    });

    await likesController.worldcupLikeToggle(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
    expect(mockLikesService.worldcupLikeToggle).toHaveBeenCalledTimes(1);
    expect(mockLikesService.getUserLiked).toHaveBeenCalledTimes(1);
    expect(mockLikesService.worldcupLikeToggle).toHaveBeenCalledWith(
      worldcupLikeToggleResLocals.user_id,
      worldcupLikeToggleRequestParams.worldcup_id,
      false
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "월드컵 좋아요 완료",
    });
  });
});

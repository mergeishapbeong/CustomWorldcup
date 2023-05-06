const WorldcupController = require("../../../controllers/mypage.controller");

let mockWorldcupService = {
  createWorldcup: jest.fn(),
  createWorldcupChoice: jest.fn(),
  getAllWorldcups: jest.fn(),
  getOneWorldcup: jest.fn(),
  updateWorldcup: jest.fn(),
  deleteWorldcup: jest.fn(),
};

let mockRequest = {
  params: jest.fn(),
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: {
    user: {
      userId: 1,
    },
  },
};

let mockNext = jest.fn();

let worldcupController = new WorldcupController();
worldcupController.worldcupService = mockWorldcupService;

describe("WorldcupController Unit Test", () => {
  /**
   1. 모든 성공 케이스 테스트
   */

  beforeEach(() => {
    // 모든 Mock 초기화
    jest.resetAllMocks();

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  /**
   1. given - Build
   2. when - Operate
   3. then - Check
   */

  test("createWorldcup success test", async () => {
    /**
     1. createWorldcup 잘 하는지 검증
     2. createWorldcupChoice 잘 하는지 검증
     */
    const newWorldcupExample = {
      worldcup_id: 1,
    };
    mockMypageService.getMyWorldcups = jest.fn(() => myWorldcupsExample);

    const newWorldcup = await mypageController.createWorldcup(mockRequest, mockResponse);

    // 1. mockWorldcupService의 createWorldcup 메소드를 호출하는지 검증
    expect(mockWorldcupService.createWorldcup).toHaveBeenCalledTimes(1);

    // 2. res.status는 201을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  test("getAllWorldcups success test", async () => {
    // PostService의 findAllPost Method를 실행했을 때 Return 값을 변수로 선언합니다.
    const myWorldcupResultsExample = [
      {
        title: "최애 라면 월드컵",
        choice_name: "신라면",
      },
      {
        title: "점메추",
        choice_name: "원숭이골",
      },
    ];
    mockMypageService.getMyWorldcupResults = jest.fn(
      () => myWorldcupResultsExample
    );

    await mypageController.getMyWorldcupResults(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. mypageService의 getMyWorldcupResults 메소드를 호출하는지 검증
    expect(mockMypageService.getMyWorldcupResults).toHaveBeenCalledTimes(1);

    // 2. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. response에서 결과 데이터를 제대로 출력하는지 검증
    expect(mockResponse.json).toHaveBeenCalledWith({
      results: myWorldcupResultsExample,
    });
  });

  test("getOneWorldcup success test", async () => {
    /**
     1. createWorldcup 잘 하는지 검증
     2. createWorldcupChoice 잘 하는지 검증
     */
    const newWorldcupExample = {
      worldcup_id: 1,
    };
    mockMypageService.getMyWorldcups = jest.fn(() => myWorldcupsExample);

    const newWorldcup = await mypageController.createWorldcup(mockRequest, mockResponse);

    // 1. mockWorldcupService의 createWorldcup 메소드를 호출하는지 검증
    expect(mockWorldcupService.createWorldcup).toHaveBeenCalledTimes(1);

    // 2. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});

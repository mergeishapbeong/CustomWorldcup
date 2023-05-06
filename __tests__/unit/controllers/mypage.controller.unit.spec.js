const MypageController = require("../../../controllers/mypage.controller");

let mockMypageService = {
  getMyWorldcups: jest.fn(),
  getMyWorldcupResults: jest.fn(),
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

let mypageController = new MypageController();
mypageController.mypageService = mockMypageService;

describe("MypageController Unit Test", () => {
  /**
   -> Controller의 모든 메소드 테스트하기
   1. getMyWorldcups
   2. getMyWorldcupResults
   일단 성공 케이스부터 만들어보자.
   */

  beforeEach(() => {
    // 모든 Mock 초기화
    jest.resetAllMocks();

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("getMyWorldcups success test", async () => {
    /**
     1. given - Build
     2. when - Operate
     3. then - Check
     */
    const myWorldcupsExample = [
      {
        title: "최애 라면 월드컵",
        content: "최애 라면을 골라요",
      },
      {
        title: "점메추",
        content: "점심 메뉴 추천 월드컵입니다.",
      },
    ];
    mockMypageService.getMyWorldcups = jest.fn(() => myWorldcupsExample);

    await mypageController.getMyWorldcups(mockRequest, mockResponse, mockNext);

    // 1. mypageService의 getMyWorldcups 메소드를 호출하는지 검증
    expect(mockMypageService.getMyWorldcups).toHaveBeenCalledTimes(1);

    // 2. res.status는 200을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. response에서 결과 데이터를 제대로 출력하는지 검증
    expect(mockResponse.json).toHaveBeenCalledWith({
      results: myWorldcupsExample,
    });
  });

  test("getMyWorldcupResults success test", async () => {
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
    mockMypageService.getMyWorldcupResults = jest.fn(() => myWorldcupResultsExample);

    await mypageController.getMyWorldcupResults(mockRequest, mockResponse, mockNext);

    // 1. mypageService의 getMyWorldcupResults 메소드를 호출하는지 검증
    expect(mockMypageService.getMyWorldcupResults).toHaveBeenCalledTimes(1);

    // 2. res.status는 200을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. response에서 결과 데이터를 제대로 출력하는지 검증
    expect(mockResponse.json).toHaveBeenCalledWith({
      results: myWorldcupResultsExample,
    });
  });
});

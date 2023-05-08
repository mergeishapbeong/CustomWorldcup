const WorldcupService = require('../../../services/worldcup.service');



let mockWorldcupRepository = {
  getOne: jest.fn(),
  createResult: jest.fn(),
};

let worldcupService = new WorldcupService();

// mocking
worldcupService.worldcupRepository = mockWorldcupRepository;

describe("WorldcupService Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  /**
   1. 결과값 내림차순 정렬 검증, 결과 검증
   2. worldcupRepository의 findAll() 메소드를 잘 호출하는지 검증
   3. 매개변수 검증
   */
   test("postWorldcupResult success test", async () => {
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

    mockWorldcupRepository.createResult = jest.fn(() => myWorldcupsExample);

    const user_id = 1;
    const myWorldcups = await mypageService.getMyWorldcups(user_id);

    // 1. 결과값 내림차순 정렬 검증, 결과 검증
    expect(myWorldcups).toEqual(
      myWorldcupsExample.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    // 2. worldcupRepository의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupRepository.findAll).toHaveBeenCalledTimes(1);

    // 3. 매개변수 검증
    expect(mockWorldcupRepository.findAll).toHaveBeenCalledWith(user_id);
  });

});
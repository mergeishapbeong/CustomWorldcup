const MypageService = require("../../../services/mypage.service");


let mockWorldcupRepository = {
  findAll: jest.fn(),
};

let mockWorldcupChoiceRepository = {
  findAllMine: jest.fn(),
};

let mypageService = new MypageService();

// mocking
mypageService.worldcupRepository = mockWorldcupRepository;
mypageService.worldcupChoiceRepository = mockWorldcupChoiceRepository;

describe("MypageService Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  /**
   1. 결과값 내림차순 정렬 검증, 결과 검증
   2. worldcupRepository의 findAll() 메소드를 잘 호출하는지 검증
   3. 매개변수 검증
   */
  test("getMyWorldcups success test", async () => {
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

    mockWorldcupRepository.findAll = jest.fn(() => myWorldcupsExample);

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

  /**
   1. 결과값 내림차순 정렬 검증, 결과 검증
   2. worldcupChoiceRepository의 findAllMine() 메소드를 잘 호출하는지 검증
   3. 매개변수 검증
   */
  test("getMyWorldcupResults success test", async () => {
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

    mockWorldcupChoiceRepository.findAllMine = jest.fn(() => myWorldcupResultsExample);

    const user_id = 1;
    const myWorldcupResults = await mypageService.getMyWorldcupResults(user_id);

    // 1. 결과값 내림차순 정렬 검증, 결과 검증
    expect(myWorldcupResults).toEqual(
      myWorldcupResultsExample.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    // 2. worldcupChoiceRepository의 findAllMine 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceRepository.findAllMine).toHaveBeenCalledTimes(1);

    // 3. 매개변수 검증
    expect(mockWorldcupChoiceRepository.findAllMine).toHaveBeenCalledWith(user_id);
  });
});

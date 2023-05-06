const MypageService = require("../../services/mypage.service");

// mock Repository <- 의존성 주입하는 건가봐. 아닌가. 아닌 거 같음.
// 의존성 주입은 Repository에서 model을 생성자의 인자로 받는 부분이 아닌가?
let mockWorldcupRepository = {
  findAll: jest.fn(),
};

let mockWorldcupChoiceRepository = {
  findAllMine: jest.fn(),
};

let mypageService = new MypageService();
// postService의 Repository를 Mock Repository로 변경합니다.
mypageService.worldcupRepository = mockWorldcupRepository;
mypageService.worldcupChoiceRepository = mockWorldcupChoiceRepository;

describe("MypageService Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("getMyWorldcups success test", async () => {
    // findAllPost Method를 실행했을 때, Return 값 입니다.
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

    const userId = 1;
    const myWorldcups = await mypageService.getMyWorldcups(userId);

    // 1. 결과값 내림차순 정렬 검증
    expect(myWorldcups).toEqual(
      myWorldcupsExample.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    // 2. worldcupRepository의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test("getMyWorldcupResults success test", async () => {
    // findAllPost Method를 실행했을 때, Return 값 입니다.
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

    const userId = 1;
    const myWorldcupResults = await mypageService.getMyWorldcupResults(userId);

    // 1. 결과값 내림차순 정렬 검증
    expect(myWorldcupResults).toEqual(
      myWorldcupResultsExample.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    // 2. worldcupChoiceRepository의 findAllMine 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceRepository.findAllMine).toHaveBeenCalledTimes(1);
  });
});

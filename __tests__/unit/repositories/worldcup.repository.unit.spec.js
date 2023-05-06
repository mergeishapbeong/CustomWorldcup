const WorldcupRepository = require("../../../repositories/worldcup.repository");

// 가상 모델 생성
let mockWorldcupModel = {
  createWorldcup: jest.fn(),
  createWorldcupChoice: jest.fn(),
  getAllWorldcups: jest.fn(),
  getOneWorldcup: jest.fn(),
  updateWorldcup: jest.fn(),
  deleteWorldcup: jest.fn(),
  findAll: jest.fn(),
};

let worldcupRepository = new WorldcupRepository(mockWorldcupModel);

describe("WorldcupRepository Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("findAll success test", async () => {
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

    mockWorldcupModel.findAll = jest.fn(() => myWorldcupsExample);

    const userId = 1;
    const myWorldcups = await worldcupRepository.findAll(userId);


    // 1. mockWorldcupModel의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupModel.findAll).toHaveBeenCalledTimes(1);

    // 2. 결과 값을 제대로 호출하는지 검증 <- 근대 이거 맞는지 잘 모르겠다.
    expect(myWorldcups).toEqual(myWorldcupsExample);
  });
});

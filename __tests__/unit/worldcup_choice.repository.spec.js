const WorldcupChoiceRepository = require("../../repositories/worldcup.choice.repository");

// 가상 모델 생성
let mockWorldcupChoiceModel = {
  findAll: jest.fn(),
};

let worldcupChoiceRepository = new WorldcupChoiceRepository(mockWorldcupChoiceModel);

describe("WorldcupChoiceRepository Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("findAllMine success test", async () => {
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

    mockWorldcupChoiceModel.findAll = jest.fn(() => myWorldcupResultsExample);

    const userId = 1;
    const myWorldcupResults = await worldcupChoiceRepository.findAllMine(userId);


    // 1. mockWorldcupModel의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceModel.findAll).toHaveBeenCalledTimes(1);

    // 2. 결과 값을 제대로 호출하는지 검증 <- 근대 이거 맞는지 잘 모르겠다.
    expect(myWorldcupResults).toEqual(myWorldcupResultsExample);
  });
});

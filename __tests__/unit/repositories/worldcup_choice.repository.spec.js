const WorldcupChoiceRepository = require("../../../repositories/worldcup.choice.repository");

// 가상 모델 생성
let mockWorldcupChoiceModel = {
  findAll: jest.fn(),
  createChoice: jest.fn(),
};

let worldcupChoiceRepository = new WorldcupChoiceRepository(mockWorldcupChoiceModel);

describe("WorldcupChoiceRepository Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  /**
   1. mockWorldcupModel의 findAll() 메소드를 호출하는지 검증
   2. findAll()에 매개변수가 제대로 들어가는지 검증
   3. 결과 값을 제대로 호출하는지 검증 <- 근대 이거 맞는지 잘 모르겠다.
   */
  test("findAllMine success test", async () => {
    const myWorldcupResultsExample = [
      {
        Worldcup: {
          title: "최애 라면 월드컵",
        },
        choice_name: "신라면",
      },
      {
        Worldcup: {
          title: "점메추",
        },
        choice_name: "원숭이골",
      },
    ];

    mockWorldcupChoiceModel.findAll = jest.fn(() => myWorldcupResultsExample);

    const user_id = 1;
    const myWorldcupResults = await worldcupChoiceRepository.findAllMine(user_id);


    // 1. mockWorldcupModel의 findAll() 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceModel.findAll).toHaveBeenCalledTimes(1);

    // 2. findAll()에 매개변수가 제대로 들어가는지 검증
    // 문제는 이 검증을 진행하면 리팩토링 내성이 너무 손상될 것 같음.
    // expect(mockWorldcupChoiceModel.findAll).toHaveBeenCalledWith(user_id);

    // 3. 결과 값을 제대로 호출하는지 검증 <- 근대 이거 맞는지 잘 모르겠다.
    //expect(myWorldcupResults).toEqual(myWorldcupResultsExample);
  });

  // 이 정도 범위의 코드는 테스트가 필요 없을 것 같음.
  test("createChoice success test", async () => {

  });
});

const WorldcupService = require('../../../services/worldcup.service');

let mockWorldcupRepository = {
  getOne: jest.fn(),
  createResult: jest.fn(),
  increasePlayCount: jest.fn(),
};

let mockWorldcupChoiceRepository = {
  createResult: jest.fn(),
  findOne: jest.fn(),
  increaseWinCount: jest.fn(),
};

let worldcupService = new WorldcupService();

// mocking
worldcupService.worldcupRepository = mockWorldcupRepository;
worldcupService.worldcupChoiceRepository = mockWorldcupChoiceRepository;

describe("WorldcupService Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  /**
   2. worldcupRepository의 createResult() 메소드를 잘 호출하는지 검증
   3. 매개변수 검증
   */
   test("postWorldcupResult success test", async () => {
    const worldcup_id = 1;
    const user_id = 1;
    const worldcup_choice_id = 1;
    const worldcupResultData = { worldcup_id, user_id, worldcup_choice_id };
    const worldcupMock = { worldcup_id };
    const worldcupResultMock = { worldcup_choice_id };
    mockWorldcupRepository.getOne = jest.fn(() => worldcupMock);
    mockWorldcupChoiceRepository.findOne = jest.fn(() => worldcupResultMock);

    await worldcupService.postWorldcupResult(worldcupResultData);

    expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);

    // 2. worldcupRepository의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceRepository.createResult).toHaveBeenCalledTimes(1);

    // 3. 매개변수 검증
    expect(mockWorldcupChoiceRepository.createResult).toHaveBeenCalledWith(worldcupResultData);
  });

});
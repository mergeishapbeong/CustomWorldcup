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
   postWorldcupResult 테스트 3가지
   1. 성공
   2. 게시글이 없어서 실패
   3. 게시글의 해당 선택지가 없어서 실패
   */

  /**
   1. 일단 뭘 검증해야 하는 걸까?
   2. worldcupRepository의 getOne() 메소드를 잘 호출하는지 검증
   3. worldcupChoiceRepository의 findOne() 메소드를 잘 호출하는지 검증
   4. worldcupChoiceRepository의 createResult() 메소드를 잘 호출하는지 검증
   5. 매개변수 검증 <- 근대 이걸 정말 해야 하나 싶음.
   */
  /**
   테스트를 하기 전에 어떤 부분에서 변경이 생길 것 같은지를 예상해보는 것은 어떨까?
   */
   test("postWorldcupResult success test", async () => {
    // 준비
    const worldcup_id = 1;
    const user_id = 1;
    const worldcup_choice_id = 1;
    const worldcupResultData = { worldcup_id, user_id, worldcup_choice_id };
    const worldcupMock = { worldcup_id };
    const worldcupResultMock = { worldcup_choice_id };
    mockWorldcupRepository.getOne = jest.fn(() => worldcupMock);
    mockWorldcupChoiceRepository.findOne = jest.fn(() => worldcupResultMock);

    // 실행
    await worldcupService.postWorldcupResult(worldcupResultData);

    // 검증
    expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
    expect(mockWorldcupRepository.getOne).toHaveBeenCalledWith(worldcupResultData.worldcup_id);

    expect(mockWorldcupChoiceRepository.findOne).toHaveBeenCalledTimes(1);

    // 2. worldcupRepository의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupChoiceRepository.createResult).toHaveBeenCalledTimes(1);
    // 매개변수까지 검증하면 회귀 방지는 높아지겠지만 리팩토링 내성이 낮아질 것 같다.
    expect(mockWorldcupChoiceRepository.createResult).toHaveBeenCalledWith(worldcupResultData);

    expect(mockWorldcupRepository.increasePlayCount).toHaveBeenCalledTimes(1);
    expect(mockWorldcupChoiceRepository.increaseWinCount).toHaveBeenCalledTimes(1);
  });

});
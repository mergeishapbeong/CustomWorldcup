const WorldcupRepository = require("../../../repositories/worldcup.repository");

let mockWorldcupModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findAll: jest.fn(),
};

let worldcupRepository = new WorldcupRepository(mockWorldcupModel);

describe("Worldcup Repository 단위 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Worldcup Repository create Method", async () => {
    const createParams = {
      user_id: 1,
      title: "repository title 테스트",
      content: "repository content 테스트",
    };

    const returnedCreatedObject = {
      createdObject: "createdObject",
    };

    mockWorldcupModel.create = jest.fn(() => returnedCreatedObject);
    const createdWorldcup = await worldcupRepository.create(
      createParams.user_id,
      createParams.title,
      createParams.content
    );
    expect(worldcupRepository.worldcupsModel.create).toHaveBeenCalledTimes(1);
    expect(createdWorldcup).toBe(returnedCreatedObject);
    expect(mockWorldcupModel.create).toHaveBeenCalledWith({
      user_id: createParams.user_id,
      title: createParams.title,
      content: createParams.content,
    });
  });

  test("Worldcup Repository getAll Method", async () => {
    const returnedAllWorldcupsObject = {
      allWorldcupsObject: "allWorldcupsObject",
    };

    mockWorldcupModel.findAll = jest.fn(() => returnedAllWorldcupsObject);

    const allWorldcups = await worldcupRepository.getAll();
    expect(worldcupRepository.worldcupsModel.findAll).toHaveBeenCalledTimes(1);
    expect(allWorldcups).toBe(returnedAllWorldcupsObject);
  });

  test("Worldcup Repository getOne Method", async () => {
    const returnedWorldcupObject = {
      oneWorldcupsObject: "oneWorldcupsObject",
    };

    mockWorldcupModel.findOne = jest.fn(() => returnedWorldcupObject);

    const worldcup_id = 1;
    const worldcup = await worldcupRepository.getOne(worldcup_id);
    expect(worldcupRepository.worldcupsModel.findOne).toHaveBeenCalledTimes(1);
    expect(worldcup).toBe(returnedWorldcupObject);
  });

  test("Worldcup Repository update Method", async () => {
    const updatedParams = {
      user_id: 1,
      worldcup_id: 1,
      title: "repository title 테스트",
      content: "repository content 테스트",
    };

    await worldcupRepository.update(
      updatedParams.title,
      updatedParams.content,
      updatedParams.worldcup_id,
      updatedParams.user_id
    );
    expect(worldcupRepository.worldcupsModel.update).toHaveBeenCalledTimes(1);
  });

  test("Worldcup Repository remove Method", async () => {
    const [worldcup_id, user_id] = [1, 1];
    await worldcupRepository.remove(worldcup_id, user_id);
    expect(worldcupRepository.worldcupsModel.destroy).toHaveBeenCalledTimes(1);
  });

  test("Worldcup Repository findAll Method", async () => {
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

    const user_id = 1;
    const myWorldcups = await worldcupRepository.findAll(user_id);

    // 1. mockWorldcupModel의 findAll 메소드를 호출하는지 검증
    expect(mockWorldcupModel.findAll).toHaveBeenCalledTimes(1);

    // 2. 결과 값을 제대로 호출하는지 검증 <- 근대 이거 맞는지 잘 모르겠다.
    expect(myWorldcups).toEqual(myWorldcupsExample);
  });
});

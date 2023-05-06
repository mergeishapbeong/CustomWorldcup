const WorldcupController = require("../../../controllers/worldcup.controller");
const Joi = require('../../../controllers/joi');

let mockWorldcupService = {
  createWorldcup: jest.fn(),
  getAllWorldcups: jest.fn(),
  getOneWorldcup: jest.fn(),
  updateWorldcup: jest.fn(),
  deleteWorldcup: jest.fn(),
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
      user_id: 1,
    },
  },
};

let mockPostWorldcupSchema = {
  // new Promise를 이용해서 만들어볼까?
  // 그리고 data를 잘 뱉어야 한다. 아마 객체 형태를 반환해줘야 할 것 같다.
  // 가져온 데이터를 그대로 뱉어주도록 하자.
  validateAsync: async (input) => {
    return {
      catch: (err) => {
        return { value: input };
      }
    };
  },
};
let mockUpdateWorldcupSchema = {
  validateAsync: async (input) => {
    return {
      catch: (err) => {
        return { value: input };
      }
    };
  },
};

let mockNext = jest.fn();

let worldcupController = new WorldcupController();
worldcupController.worldcupService = mockWorldcupService;
worldcupController.postWorldcupSchema = mockPostWorldcupSchema;
worldcupController.updateWorldcupSchema = mockUpdateWorldcupSchema;

describe("WorldcupController Unit Test", () => {
  /**
   1. 모든 성공 케이스 테스트
   */

  beforeEach(() => {
    // 모든 Mock 초기화
    jest.resetAllMocks();

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  /**
   1. given - Build
   2. when - Operate
   3. then - Check
   */

  /**
   1. worldcupService의 createWorldcup() 메소드를 잘 호출하는지 검증
   2. res.status는 201의 값을 반환하는지 검증
   */
  test("createWorldcup success test", async () => {
    // 여기에서 입력 값을 넣어줬어야 했는데 그러지 않았었구나
    mockRequest.body.title = '여자 아이돌 월드컵';
    mockRequest.body.content = '귀엽습니다 ^^';
    mockRequest.body.choices = [];

    await worldcupController.createWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. worldcupService의 createWorldcup() 메소드를 잘 호출하는지 검증
    expect(mockWorldcupService.createWorldcup).toHaveBeenCalledTimes(1);

    // 2. res.status는 201의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  /**
   1. worldcupService의 getAllWorldcups() 메소드를 잘 호출하는지 검증
   2. res.status는 200의 값을 반환하는지 검증
   3. getAllWorldcups()에서 얻은 worldcups를 잘 반환하는지 검증
   */
  test("getAllWorldcups success test", async () => {
    // PostService의 findAllPost Method를 실행했을 때 Return 값을 변수로 선언합니다.
    const worldcupsExample = [];
    mockWorldcupService.getAllWorldcups = jest.fn(() => worldcupsExample);

    await worldcupController.getAllWorldcups(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. mypageService의 getMyWorldcupResults 메소드를 호출하는지 검증
    expect(mockWorldcupService.getAllWorldcups).toHaveBeenCalledTimes(1);

    // 2. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 3. response에서 결과 데이터를 제대로 출력하는지 검증
    expect(mockResponse.json).toHaveBeenCalledWith({
      worldcups: worldcupsExample,
    });
  });

  /**
   1. worldcupService의 getOneWorldcup() 메소드를 잘 호출하는지 검증
   2. 입력값을 getOneWorldcup()으로 잘 전달하는지 검증
   3. res.status는 200의 값을 반환하는지 검증
   4. getOneWorldcup()에서 얻은 worldcup을 잘 반환하는지 검증
   */
  test("getOneWorldcup success test", async () => {
    const worldcup_id = 1;
    mockRequest.params.worldcup_id = worldcup_id;
    const worldcupExample = {};
    mockWorldcupService.getOneWorldcup = jest.fn(() => worldcupExample);

    await worldcupController.getOneWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. mockWorldcupService의 getOneWorldcup 메소드를 호출하는지 검증
    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);

    // 2. 입력값을 getOneWorldcup()으로 잘 전달하는지 검증
    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledWith(
      worldcup_id
    );

    // 3. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // 4. getOneWorldcup()에서 얻은 worldcup을 잘 반환하는지 검증
    expect(mockResponse.json).toHaveBeenCalledWith({
      worldcup: worldcupExample,
    });
  });

  /**
   1. worldcupService의 updateWorldcup() 메소드를 잘 호출하는지 검증
   2. 입력값을 updateWorldcup()으로 잘 전달하는지 검증
   3. res.status는 200의 값을 반환하는지 검증
   */
  test("updateWorldcup success test", async () => {
    mockRequest.body.title = '여자 아이돌 월드컵';
    mockRequest.body.content = '귀엽습니다 ^^';
    
    await worldcupController.updateWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. mockWorldcupService의 getOneWorldcup 메소드를 호출하는지 검증
    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);

    // 2. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  /**
   1. worldcupService의 deleteWorldcup() 메소드를 잘 호출하는지 검증
   2. 입력값을 worldcupService의 deleteWorldcup() 메소드로 잘 전달하는지 검증
   3. res.status는 200의 값을 반환하는지 검증
   */
  test("deleteWorldcup success test", async () => {
    const worldcup_id = 1;
    const user_id = 1;
    mockRequest.params.worldcup_id = worldcup_id;
    mockResponse.locals.user.user_id = user_id;

    await worldcupController.deleteWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    // 1. worldcupService의 deleteWorldcup 메소드를 잘 호출하는지 검증
    expect(mockWorldcupService.deleteWorldcup).toHaveBeenCalledTimes(1);

    // 2. 입력값을 deleteWorldcup로 잘 전달하는지 검증
    expect(mockWorldcupService.deleteWorldcup).toHaveBeenCalledWith(
      worldcup_id,
      user_id
    );

    // 3. res.status는 200의 값을 반환하는지 검증
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});

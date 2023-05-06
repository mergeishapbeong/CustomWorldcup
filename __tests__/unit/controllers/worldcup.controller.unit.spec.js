const WorldcupController = require("../../../controllers/worldcup.controller.js");
const { postWorldcupSchema, updateWorldcupSchema } = require("../../../controllers/joi");

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

let mockNext = jest.fn();

let worldcupController = new WorldcupController();
worldcupController.worldcupService = mockWorldcupService;

describe("Worldcup Controller 단위 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("GET: Worldcup Controller getAllWorldcups 성공 케이스", async () => {
    const worldcupsReturnedValue = [
      {
        worldcup_id: 2,
        user_id: 2,
        title: "고양이테스트임",
        content: "고양이테스트임",
        likes: 0,
        createdAt: "2023-05-06T02:49:25.000Z",
        updatedAt: "2023-05-06T02:49:25.000Z",
      },
      {
        worldcup_id: 1,
        user_id: 1,
        title: "제목",
        content: "내용",
        likes: 0,
        createdAt: "2023-05-06T01:32:24.000Z",
        updatedAt: "2023-05-06T01:52:19.000Z",
      },
    ];

    mockWorldcupService.getAllWorldcups = jest.fn(() => worldcupsReturnedValue);

    await worldcupController.getAllWorldcups(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.getAllWorldcups).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      worldcups: worldcupsReturnedValue,
    });
  });

  test("GET: Worldcup Controller getOneWorldcup 성공 케이스", async () => {
    const worldcupReturnedValue = [
      {
        worldcup_id: 1,
        user_id: 1,
        title: "제목",
        content: "내용",
        likes: 0,
        createdAt: "2023-05-06T01:32:24.000Z",
        updatedAt: "2023-05-06T01:52:19.000Z",
      },
    ];

    mockWorldcupService.getOneWorldcup = jest.fn(() => worldcupReturnedValue);

    await worldcupController.getOneWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      worldcup: worldcupReturnedValue,
    });
  });

  test("POST: Worldcup Controller createWorldcup 성공 케이스", async () => {
    const createWorldcupRequestBodyParams = {
      title: "타이틀 테스트",
      content: "컨텐트 테스트",
      choices: [
        {
          choice_name: "테스트",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
        {
          choice_name: "테스트",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
      ],
    };

    mockRequest.body = createWorldcupRequestBodyParams;

    const createPostReturnValue = "월드컵 작성 완료";

    // validation
    const validationResult = postWorldcupSchema.validate(mockRequest.body)
    expect(validationResult.value).toEqual(createWorldcupRequestBodyParams)

    // createWorldcup
    mockWorldcupService.createPost = jest.fn();

    await worldcupController.createWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.createWorldcup).toHaveBeenCalledTimes(1);
    expect(mockWorldcupService.createWorldcup).toHaveBeenCalledWith(
      mockResponse.locals.user.user_id,
      createWorldcupRequestBodyParams.title,
      createWorldcupRequestBodyParams.content,
      createWorldcupRequestBodyParams.choices
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: createPostReturnValue,
    });
  });

  test("POST: Worldcup Controller createWorldcup 실패 케이스", async () => {
    const createWorldcupRequestBodyParamsInvalid1 = {
      title: "",
      content: "Content_InvalidParamsError",
      choices: [
        {
          choice_name: "Choice_name_InvalidParamsError",
          choice_url: "Choice_url_InvalidParamsError",
        },
        {
          choice_name: "Choice_name_InvalidParamsError",
          choice_url: "Choice_url_InvalidParamsError",
        },
      ],
    };

    // validation
    mockRequest.body = createWorldcupRequestBodyParamsInvalid1;
    const validationResult = postWorldcupSchema.validate(mockRequest.body)
    expect(validationResult).toEqual()

    // // controller function
    // await worldcupController.createWorldcup(mockRequest, mockResponse, mockNext);

    // expect(mockResponse.status).toHaveBeenCalledTimes(1);
    // expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  test("PUT: Worldcup Controller updateWorldcup 성공 케이스", async () => {
    const updateWorldcupRequestBodyParams = {
      title: "타이틀 수정 테스트",
      content: "컨텐트 수정 테스트",
    };

    mockRequest.body = updateWorldcupRequestBodyParams;

    mockWorldcupService.createPost = jest.fn(() => createPostReturnValue);

    await postsController.createWorldcup(mockRequest, mockResponse, mockNext);

    expect(mockWorldcupService.createPost).toHaveBeenCalledTimes(1);
    expect(mockWorldcupService.createPost).toHaveBeenCalledWith(
      createWorldcupRequestBodyParams.title,
      createWorldcupRequestBodyParams.content,
      createWorldcupRequestBodyParams.choices
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createPostReturnValue,
    });
  });

  test("PUT: Worldcup Controller createWorldcup 실패 케이스", async () => {
    const createPostRequestBodyParamsByInvalidParamsError = {
      nickname: "Nickname_InvalidParamsError",
      password: "Password_InvalidParamsError",
    };

    mockRequest.body = createPostRequestBodyParamsByInvalidParamsError;

    await postsController.createWorldcup(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  test("DELETE: Worldcup Controller deleteWorldcup 성공 케이스", async () => {
    mockRequest.body = createWorldcupRequestBodyParams;

    mockWorldcupService.createPost = jest.fn(() => createPostReturnValue);

    await postsController.createWorldcup(mockRequest, mockResponse, mockNext);

    expect(mockWorldcupService.createPost).toHaveBeenCalledTimes(1);
    expect(mockWorldcupService.createPost).toHaveBeenCalledWith(
      createWorldcupRequestBodyParams.title,
      createWorldcupRequestBodyParams.content,
      createWorldcupRequestBodyParams.choices
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: createPostReturnValue,
    });
  });

  test("DELETE: Worldcup Controller createWorldcup 실패 케이스", async () => {
    const createPostRequestBodyParamsByInvalidParamsError = {
      nickname: "Nickname_InvalidParamsError",
      password: "Password_InvalidParamsError",
    };

    mockRequest.body = createPostRequestBodyParamsByInvalidParamsError;

    await postsController.createWorldcup(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});

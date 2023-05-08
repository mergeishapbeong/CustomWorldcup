const WorldcupController = require("../../../controllers/worldcup.controller.js");
const {
  postWorldcupSchema,
  updateWorldcupSchema,
} = require("../../../controllers/joi");

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

    const createWorldcupReturnValue = {
      choices: createWorldcupRequestBodyParams.choices,
      content: createWorldcupRequestBodyParams.content,
      title: createWorldcupRequestBodyParams.title,
      user_id: mockResponse.locals.user.user_id,
      worldcup_id: 1,
    };

    // validation
    const validationResult = postWorldcupSchema.validate(mockRequest.body);
    expect(validationResult.value).toEqual(createWorldcupRequestBodyParams);

    // createWorldcup
    mockWorldcupService.createWorldcup = jest.fn(
      () => createWorldcupReturnValue
    );

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
      newWorldcup: createWorldcupReturnValue,
    });
  });

  test("POST: Worldcup Controller createWorldcup 실패 케이스", async () => {
    mockRequest.body = {
      title: "타이틀 실패 테스트",
      content: "컨텐트 실패 테스트",
      choices: [],
    };

    // title validation
    {
      mockRequest.body.title = "";
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목이 비어있습니다.")
      );
    }
    {
      mockRequest.body.title = 12345;
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목의 형식이 올바르지 않습니다.")
      );
    }
    {
      mockRequest.body.title = "0123456789012345678901234567890123";
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목은 최대 30자이어야 합니다.")
      );
    }
    // content validation
    {
      mockRequest.body.content = "";
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 내용이 비어있습니다.")
      );
    }
    {
      mockRequest.body.content = 12345;
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 내용의 형식이 올바르지 않습니다.")
      );
    }
    // choices validation
    {
      mockRequest.body.choices = [
        {
          choice_name: "",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
        {
          choice_name: "이름",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
      ];
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 종목의 형식이 올바르지 않습니다.")
      );
    }
    {
      mockRequest.body.choices = [
        {
          choice_name: "이름",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
        {
          choice_name: "이름",
          choice_url: "url",
        },
      ];
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 종목의 형식이 올바르지 않습니다.")
      );
    }
    {
      mockRequest.body.choices = [
        {
          choice_name: "테스트",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
      ];
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 종목은 최소 2개이어야 합니다.")
      );
    }
    {
      mockRequest.body.choices = [
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
        {
          choice_name: "테스트",
          choice_url:
            "https://media.istockphoto.com/id/108221348/photo/cat-jumping.jpg?s=1024x1024&w=is&k=20&c=W4pZdN6qS1HJG1fBMEhNEhKl8iJt4Q2yazF_3vF0qAw=",
        },
      ];
      expect(() =>
        postWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 종목 개수는 짝수이어야 합니다.")
      );
    }
  });

  test("GET: Worldcup Controller getAllWorldcups 성공 케이스", async () => {
    const worldcupsReturnedValue = [
      {
        worldcup_id: 2,
        user_id: 2,
        title: "테스트",
        content: "테스트",
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

  test("PUT: Worldcup Controller updateWorldcup 성공 케이스", async () => {
    const updateWorldcupRequestBodyParams = {
      title: "타이틀 수정 테스트",
      content: "컨텐트 수정 테스트",
    };

    mockRequest.body = updateWorldcupRequestBodyParams;
    mockRequest.params = { worldcup_id: 1 };

    const updateWorldcupReturnValue = {
      title: "타이틀 수정 테스트",
      content: "컨텐트 수정 테스트",
      worldcup_id: mockRequest.params.worldcup_id,
      user_id: mockResponse.locals.user.user_id,
    };

    // validation
    const validationResult = updateWorldcupSchema.validate(mockRequest.body);
    expect(validationResult.value).toEqual(updateWorldcupRequestBodyParams);

    mockWorldcupService.updateWorldcup = jest.fn(
      () => updateWorldcupReturnValue
    );

    await worldcupController.updateWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.updateWorldcup).toHaveBeenCalledTimes(1);
    expect(mockWorldcupService.updateWorldcup).toHaveBeenCalledWith(
      updateWorldcupRequestBodyParams.title,
      updateWorldcupRequestBodyParams.content,
      mockResponse.locals.user.user_id,
      mockRequest.params.worldcup_id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      updatedWorldcup: updateWorldcupReturnValue,
    });
  });

  test("PUT: Worldcup Controller createWorldcup 실패 케이스", async () => {
    mockRequest.body = {
      title: "타이틀 수정 실패 테스트",
      content: "컨텐트 수정 실패 테스트",
    };

    // title validation
    {
      mockRequest.body.title = "";
      expect(() =>
        updateWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목이 비어있습니다.")
      );
    }
    {
      mockRequest.body.title = 12345;
      expect(() =>
        updateWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목의 형식이 올바르지 않습니다.")
      );
    }
    {
      mockRequest.body.title = "0123456789012345678901234567890123";
      expect(() =>
        updateWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 제목은 최대 30자이어야 합니다.")
      );
    }
    // content validation
    {
      mockRequest.body.content = "";
      expect(() =>
        updateWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 내용이 비어있습니다.")
      );
    }
    {
      mockRequest.body.content = 12345;
      expect(() =>
        updateWorldcupSchema
          .validate(mockRequest.body)
          .toThrow("월드컵 내용의 형식이 올바르지 않습니다.")
      );
    }
  });

  test("DELETE: Worldcup Controller deleteWorldcup 성공 케이스", async () => {
    mockRequest.params = { worldcup_id: 1 };

    const deleteWorldcupReturnMessage = "월드컵 삭제 완료";

    mockWorldcupService.deletePost = jest.fn(() => deleteWorldcupReturnMessage);

    await worldcupController.deleteWorldcup(
      mockRequest,
      mockResponse,
      mockNext
    );

    expect(mockWorldcupService.deleteWorldcup).toHaveBeenCalledTimes(1);
    expect(mockWorldcupService.deleteWorldcup).toHaveBeenCalledWith(
      mockRequest.params.worldcup_id,
      mockResponse.locals.user.user_id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: deleteWorldcupReturnMessage,
    });
  });
});

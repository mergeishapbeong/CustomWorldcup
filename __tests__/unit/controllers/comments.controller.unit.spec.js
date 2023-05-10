const CommentsController = require("../../../controllers/comments.controller");
const {
  createCommentSchema,
  updateCommentSchema,
} = require("../../../controllers/joi");

let mockCommentsService = {
  createComment: jest.fn(),
  findAllComments: jest.fn(),
  findOneComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

let mockWorldcupService = {
  getOneWorldcup: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: {
    user: {},
  },
};

let mockNext = jest.fn();

let commentsController = new CommentsController();
commentsController.commentsService = mockCommentsService;
commentsController.worldcupService = mockWorldcupService;

describe("Layered Architecture Pattern Comments Controller Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("Comments Controller createComment Method by Success", async () => {
    const createCommentRequestBody = {
      comment: "Comment_Success",
    };
    const createCommentRequestParams = {
      worldcup_id: 11,
    };
    const createCommentResLocals = {
      user_id: 4,
    };

    mockRequest.body = createCommentRequestBody;
    mockRequest.params = createCommentRequestParams;
    mockResponse.locals.user = createCommentResLocals;

    const createCommentReturnValue = { message: "댓글 작성 완료" };

    mockCommentsService.createComment = jest.fn(() => createCommentReturnValue);

    const validationResult = createCommentSchema.validate(mockRequest.body);
    expect(validationResult.value).toEqual(createCommentRequestBody);

    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });

    await commentsController.createComment(mockRequest, mockResponse, mockNext);

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.createComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.createComment).toHaveBeenCalledWith(
      createCommentRequestBody.comment,
      createCommentRequestParams.worldcup_id,
      createCommentResLocals.user_id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "댓글 작성 완료",
    });
  });

  test("Comments Controller findAllComments Method by Success", async () => {
    const findAllCommentsReturnValue = {
      comments: [
        {
          comment_id: 1,
          comment: "댓글 내용",
          user_id: 1,
          nickname: "kim_cool",
          createdAt: "2022-07-25T07:45:56.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
        {
          comment_id: 2,
          comment: "댓글 내용12",
          user_id: 2,
          nickname: "kim_cool1",
          createdAt: "2022-07-25T07:45:56.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
      ],
    };
    const createCommentRequestParams = {
      worldcup_id: 11,
    };
    mockRequest.params = createCommentRequestParams;

    mockCommentsService.findAllComments = jest.fn(
      () => findAllCommentsReturnValue
    );

    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });

    await commentsController.findAllComments(mockRequest, mockResponse);

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);

    expect(mockCommentsService.findAllComments).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith(findAllCommentsReturnValue);
  });

  test("Comments Controller updateComment Method by Success", async () => {
    const updateCommentRequestBody = {
      comment: "Comment_Success",
    };
    const updateCommentRequestParams = {
      worldcup_id: 11,
      comment_id: 12,
    };
    const updateCommentResLocals = {
      user_id: 4,
    };

    mockRequest.body = updateCommentRequestBody;
    mockRequest.params = updateCommentRequestParams;
    mockResponse.locals.user = updateCommentResLocals;

    const updateCommentReturnValue = { message: "댓글 수정 완료" };

    mockCommentsService.updateComment = jest.fn(() => updateCommentReturnValue);

    const validationResult = updateCommentSchema.validate(mockRequest.body);
    expect(validationResult.value).toEqual(updateCommentRequestBody);

    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });
    mockCommentsService.findOneComment = jest.fn(() => {
      return {
        user_id: 4,
      };
    });

    await commentsController.updateComment(mockRequest, mockResponse, mockNext);

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.findOneComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.updateComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.updateComment).toHaveBeenCalledWith(
      updateCommentRequestBody.comment,
      updateCommentRequestParams.worldcup_id,
      updateCommentRequestParams.comment_id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "댓글 수정 완료",
    });
  });

  test("Comments Controller deleteComment Method by Success", async () => {
    const deleteCommentRequestParams = {
      worldcup_id: 11,
      comment_id: 12,
    };
    const deleteCommentResLocals = {
      user_id: 4,
    };

    mockRequest.params = deleteCommentRequestParams;
    mockResponse.locals.user = deleteCommentResLocals;

    const deleteCommentReturnValue = { message: "댓글 삭제 완료" };

    mockCommentsService.deleteComment = jest.fn(() => deleteCommentReturnValue);
    mockWorldcupService.getOneWorldcup = jest.fn(() => {
      return {
        message: "하나 있긴 함.",
      };
    });
    mockCommentsService.findOneComment = jest.fn(() => {
      return {
        user_id: 4,
      };
    });

    await commentsController.deleteComment(mockRequest, mockResponse, mockNext);

    expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.findOneComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.deleteComment).toHaveBeenCalledTimes(1);
    expect(mockCommentsService.deleteComment).toHaveBeenCalledWith(
      deleteCommentRequestParams.worldcup_id,
      deleteCommentRequestParams.comment_id,
      deleteCommentResLocals.user_id
    );

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "댓글 삭제 완료",
    });
  });
});

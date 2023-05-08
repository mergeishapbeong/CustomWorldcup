const CommentsController = require("../../../controllers/comments.controller");

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
  tatus: jest.fn(),
  json: jest.fn(),
  locals: {},
};

let commentsController = new CommentsController();
commentsController.commentsService = mockCommentsService;

describe("Layered Architecture Pattern Comments Controller Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  //   test("Comments Controller createComment Method by Success", async () => {
  //     const createCommentRequestBodyParams = {
  //       title: "Title_Success",
  //       content: "Content_Success",
  //     };
  //     const createPostResLocals = {
  //       nickname: "Nickname_Success",
  //       userId: 1,
  //     };

  //     mockRequest.body = createPostRequestBodyParams;
  //     mockResponse.locals.user = createPostResLocals;

  //     const createPostReturnValue = { message: "게시글 생성 성공" };

  //     mockPostService.createPost = jest.fn(() => createPostReturnValue);

  //     await postsController.createPost(mockRequest, mockResponse);

  //     expect(mockPostService.createPost).toHaveBeenCalledTimes(1);
  //     expect(mockPostService.createPost).toHaveBeenCalledWith(
  //       createPostResLocals.nickname,
  //       createPostResLocals.userId,
  //       createPostRequestBodyParams.title,
  //       createPostRequestBodyParams.content
  //     );

  //     expect(mockResponse.status).toHaveBeenCalledTimes(1);
  //     expect(mockResponse.status).toHaveBeenCalledWith(201);

  //     expect(mockResponse.json).toHaveBeenCalledWith({
  //       message: "게시글 생성 성공",
  //     });
  //   });
});

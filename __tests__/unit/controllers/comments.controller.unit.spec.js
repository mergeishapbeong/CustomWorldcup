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

// describe("Layered Architecture Pattern Comments Controller Unit Test", () => {
//   // 각 test가 실행되기 전에 실행됩니다.
//   beforeEach(() => {
//     jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

//     // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
//     mockResponse.status = jest.fn(() => {
//       return mockResponse;
//     });
//   });

//   test("Comments Controller createComment Method by Success", async () => {
//     const createCommentRequestBody = {
//       comment: "Comment_Success",
//     };
//     const createCommentRequestParams = {
//       worldcup_id: 11,
//     };
//     const createCommentResLocals = {
//       user_id: 4,
//     };

//     mockRequest.body = createCommentRequestBody;
//     mockRequest.params = createCommentRequestParams;
//     mockResponse.locals.user = createCommentResLocals;

//     const createCommentReturnValue = { message: "댓글 작성 완료" };

//     mockCommentsService.createComment = jest.fn(() => createCommentReturnValue);

//     const validationResult = createCommentSchema.validate(mockRequest.body);
//     expect(validationResult.value).toEqual(createCommentRequestBody);

//     mockWorldcupService.getOneWorldcup = jest.fn(() => {
//       message: "하나 있긴함";
//     });

//     await commentsController.createComment(mockRequest, mockResponse, mockNext);

//     expect(mockWorldcupService.getOneWorldcup).toHaveBeenCalledTimes(1);
//     expect(mockCommentsService.createComment).toHaveBeenCalledTimes(1);
//     expect(mockCommentsService.createComment).toHaveBeenCalledWith(
//       createCommentRequestBody.comment,
//       createCommentRequestParams.worldcup_id,
//       createCommentResLocals.user_id
//     );

//     expect(mockResponse.status).toHaveBeenCalledTimes(1);
//     expect(mockResponse.status).toHaveBeenCalledWith(200);

//     expect(mockResponse.json).toHaveBeenCalledWith({
//       message: "댓글 작성 완료",
//     });
//   });
// });

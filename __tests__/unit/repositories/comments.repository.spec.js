const Commentsrepository = require("../../../repositories/comments.repository");

// 가상 모델 생성
let mockCommentsModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

let commentsRepository = new Commentsrepository(mockCommentsModel);

describe("WorldcupRepository Unit Test", () => {
  beforeEach(() => {
    // 모든 Mock을 초기화합니다.
    jest.resetAllMocks();
  });

  test("create success test", async () => {
    mockCommentsModel.create = jest.fn(() => {
      return "created";
    });
    const CommentsBody = {
      comment: "comment",
      worldcup_id: 1,
      user_id: 1,
    };

    const createCommentData = await commentsRepository.createComment(
      CommentsBody.comment,
      CommentsBody.worldcup_id,
      CommentsBody.user_id
    );

    expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

    expect(createCommentData).toEqual("created");
    expect(mockCommentsModel.create).toHaveBeenCalledWith({
      comment: CommentsBody.comment,
      worldcup_id: CommentsBody.worldcup_id,
      user_id: CommentsBody.user_id,
    });
  });

  test("findAll success test", async () => {
    mockCommentsModel.findAll = jest.fn(() => {
      return "findAll";
    });
    const CommentsParam = {
      worldcup_id: 1,
    };

    const findAllCommentData = await commentsRepository.findAllComments(
      CommentsParam.worldcup_id
    );

    expect(mockCommentsModel.findAll).toHaveBeenCalledTimes(1);

    expect(findAllCommentData).toEqual("findAll");
    expect(mockCommentsModel.findAll).toHaveBeenCalledWith({
      worldcup_id: CommentsParam.worldcup_id,
    });
  });

  //   test("createComment success test", async () => {
  //     mockCommentsModel.create = jest.fn(() => {
  //       return "created";
  //     });
  //     const CommentsBody = {
  //       comment: "comment",
  //       worldcup_id: 1,
  //       user_id: 1,
  //     };

  //     const createCommentData = await commentsRepository.createComment(
  //       CommentsBody.comment,
  //       CommentsBody.worldcup_id,
  //       CommentsBody.user_id
  //     );

  //     expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

  //     expect(createCommentData).toEqual("created");
  //     expect(mockCommentsModel.create).toHaveBeenCalledWith({
  //       comment: CommentsBody.comment,
  //       worldcup_id: CommentsBody.worldcup_id,
  //       user_id: CommentsBody.user_id,
  //     });
  //   });

  //   test("createComment success test", async () => {
  //     mockCommentsModel.create = jest.fn(() => {
  //       return "created";
  //     });
  //     const CommentsBody = {
  //       comment: "comment",
  //       worldcup_id: 1,
  //       user_id: 1,
  //     };

  //     const createCommentData = await commentsRepository.createComment(
  //       CommentsBody.comment,
  //       CommentsBody.worldcup_id,
  //       CommentsBody.user_id
  //     );

  //     expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

  //     expect(createCommentData).toEqual("created");
  //     expect(mockCommentsModel.create).toHaveBeenCalledWith({
  //       comment: CommentsBody.comment,
  //       worldcup_id: CommentsBody.worldcup_id,
  //       user_id: CommentsBody.user_id,
  //     });
  //   });

  //   test("createComment success test", async () => {
  //     mockCommentsModel.create = jest.fn(() => {
  //       return "created";
  //     });
  //     const CommentsBody = {
  //       comment: "comment",
  //       worldcup_id: 1,
  //       user_id: 1,
  //     };

  //     const createCommentData = await commentsRepository.createComment(
  //       CommentsBody.comment,
  //       CommentsBody.worldcup_id,
  //       CommentsBody.user_id
  //     );

  //     expect(mockCommentsModel.create).toHaveBeenCalledTimes(1);

  //     expect(createCommentData).toEqual("created");
  //     expect(mockCommentsModel.create).toHaveBeenCalledWith({
  //       comment: CommentsBody.comment,
  //       worldcup_id: CommentsBody.worldcup_id,
  //       user_id: CommentsBody.user_id,
  //     });
  //   });
});

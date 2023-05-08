const CommentsService = require("../../../services/comments.service");

let mockCommentsRepository = {
  createComment: jest.fn(),
  findAllComments: jest.fn(),
  findOneComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

let commentsService = new CommentsService();
// postService의 Repository를 Mock Repository로 변경합니다.
commentsService.commentsRepository = mockCommentsRepository;

describe("Comments Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Comments Service createComment Method", async () => {
    const createCommentReturnValue = { message: "댓글 작성 완료" };

    const createCommentParams = {
      commet: "댓글 입니다",
      worldcup_id: 1,
      user_id: 2,
    };

    mockCommentsRepository.createComment = jest.fn(() => {
      return createCommentReturnValue;
    });

    const createCommentData = await commentsService.createComment(
      createCommentParams.commet,
      createCommentParams.worldcup_id,
      createCommentParams.user_id
    );

    expect(createCommentData).toEqual({ message: "댓글 작성 완료" });

    expect(mockCommentsRepository.createComment).toHaveBeenCalledTimes(1);
  });

  test("Comments Service findAllComments Method", async () => {
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
      ],
    };

    const findAllCommentsParams = {
      worldcup_id: 1,
    };

    mockCommentsRepository.findAllComments = jest.fn(() => {
      return findAllCommentsReturnValue;
    });

    const findAllCommentsData = await commentsService.findAllComments(
      findAllCommentsParams.worldcup_id
    );

    expect(findAllCommentsData).toEqual({
      comments: [
        {
          comment_id: 1,
          comment: "댓글 내용",
          user_id: 1,
          nickname: "kim_cool",
          createdAt: "2022-07-25T07:45:56.000Z",
          updatedAt: "2022-07-25T07:52:09.000Z",
        },
      ],
    });

    expect(mockCommentsRepository.findAllComments).toHaveBeenCalledTimes(1);
  });

  test("Comments Service findOneComment Method", async () => {
    const findOneCommentReturnValue = {
      comments: {
        comment_id: 1,
        comment: "댓글 내용",
        user_id: 1,
        nickname: "kim_cool",
        createdAt: "2022-07-25T07:45:56.000Z",
        updatedAt: "2022-07-25T07:52:09.000Z",
      },
    };

    const findOneCommentParams = {
      comment_id: 1,
    };

    mockCommentsRepository.findOneComment = jest.fn(() => {
      return findOneCommentReturnValue;
    });

    const findOneCommentData = await commentsService.findOneComment(
      findOneCommentParams.comment_id
    );

    expect(findOneCommentData).toEqual({
      comments: {
        comment_id: 1,
        comment: "댓글 내용",
        user_id: 1,
        nickname: "kim_cool",
        createdAt: "2022-07-25T07:45:56.000Z",
        updatedAt: "2022-07-25T07:52:09.000Z",
      },
    });

    expect(mockCommentsRepository.findOneComment).toHaveBeenCalledTimes(1);
  });

  test("Comments Service updateComment Method", async () => {
    const updateCommentReturnValue = { message: "댓글 수정 완료" };

    const updateCommentParams = {
      comment: "수정된 댓글입니다.",
      worldcup_id: 2,
      comment_id: 2,
    };

    mockCommentsRepository.updateComment = jest.fn(() => {
      return updateCommentReturnValue;
    });

    const updateCommentData = await commentsService.updateComment(
      updateCommentParams.comment,
      updateCommentParams.worldcup_id,
      updateCommentParams.comment_id
    );

    expect(updateCommentData).toEqual({ message: "댓글 수정 완료" });

    expect(mockCommentsRepository.updateComment).toHaveBeenCalledTimes(1);
  });

  test("Comments Service deleteComment Method", async () => {
    const deleteCommentReturnValue = { message: "댓글 삭제 완료" };

    const deleteCommentParams = {
      worldcup_id: 2,
      comment_id: 2,
      user_id: 3,
    };

    mockCommentsRepository.deleteComment = jest.fn(() => {
      return deleteCommentReturnValue;
    });

    const deleteCommentData = await commentsService.deleteComment(
      deleteCommentParams.worldcup_id,
      deleteCommentParams.comment_id,
      deleteCommentParams.user_id
    );

    expect(deleteCommentData).toEqual({ message: "댓글 삭제 완료" });

    expect(mockCommentsRepository.deleteComment).toHaveBeenCalledTimes(1);
  });
});

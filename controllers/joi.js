const Joi = require("joi");

module.exports = {
  postWorldcupSchema: Joi.object({
    title: Joi.string().required().max(30).messages({
      "string.base": "월드컵 제목의 형식이 올바르지 않습니다.",
      "string.empty": "월드컵 제목이 비어있습니다.",
      "string.max": "월드컵 제목은 최대 30자이어야 합니다.",
    }),
    content: Joi.string().required().messages({
      "string.base": "월드컵 내용의 형식이 올바르지 않습니다.",
      "string.empty": "월드컵 내용이 비어있습니다.",
    }),
    choices: Joi.array()
      .required()
      .min(2)
      .items(
        Joi.object({
          choice_name: Joi.string().required(),
          choice_url: Joi.string().uri().required(),
        })
      )
      .custom((value, helpers) => {
        if (value.length % 2 !== 0) {
          return helpers.error("custom.numofObjectsNotEven");
        }
        return value;
      })
      .message({
        "array.base": "월드컵 종목의 형식이 올바르지 않습니다.",
        "array.empty": "월드컵 종목이 비어있습니다.",
        "array.min": "월드컵 종목은 최소 2개이어야 합니다.",
        "custom.numofObjectsNotEven": "월드컵 종목 개수는 짝수이어야 합니다.",
      }),
  }),
  updateWorldcupSchema: Joi.object({
    title: Joi.string().required().max(30).messages({
      "string.base": "월드컵 제목의 형식이 올바르지 않습니다.",
      "string.empty": "월드컵 제목이 비어있습니다.",
      "string.max": "월드컵 제목은 최대 30자이어야 합니다.",
    }),
    content: Joi.string().required().messages({
      "string.base": "월드컵 내용의 형식이 올바르지 않습니다.",
      "string.empty": "월드컵 내용이 비어있습니다.",
    }),
  }),

  createCommentSchema: Joi.object({
    comment: Joi.string().required().messages({
      "string.base": "댓글의 형식이 올바르지 않습니다.",
      "string.empty": "댓글이 비어있습니다.",
    }),
  }),

  updateCommentSchema: Joi.object({
    comment: Joi.string().required().messages({
      "string.base": "댓글의 형식이 올바르지 않습니다.",
      "string.empty": "댓글이 비어있습니다.",
    }),
  }),
};

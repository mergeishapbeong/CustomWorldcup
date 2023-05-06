const Joi = require("joi");

module.exports = {
  postWorldcupSchema: Joi.object({
    title: Joi.string().required().min(1).max(30),
    content: Joi.string().required().min(1),
    choices: Joi.array()
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
        "custom.numofObjectsNotEven": "월드컵 종목 개수는 짝수이어야 합니다.",
      }),
  }),
};

const { Tokens } = require("../models");

class TokenRepository {
  setRefreshToken = async (refreshToken, userId) => {
    const existToken = await Tokens.findOne({
      where: { user_id: userId },
      attributes: ["user_id"],
    });

    if (!existToken) {
      const rToken = await Tokens.create({
        user_id: userId,
        token: refreshToken,
      });
      return rToken;
    }
  };

  getRefreshToken = async (userId) => {
    const token = await Tokens.findOne({
      where: { user_id: userId },
      attributes: ["user_id"],
    });
    return token;
  };
}

module.exports = TokenRepository;

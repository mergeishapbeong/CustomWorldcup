const UserRepository = require("../repositories/users.repository");
const { Users } = require("../models");
const { Tokens } = require("../models");
const jwt = require("jsonwebtoken");
const TokenRepository = require("../repositories/tokens.repository");

class UserService {
  userRepository = new UserRepository(Users);
  tokenRepository = new TokenRepository(Tokens);

  signup = async (nickname, password, email) => {
    await this.userRepository.createUser(nickname, password, email);
    return { message: "회원 가입 완료" };
  };

  login = async (nickname) => {
    const user = await this.userRepository.findOneUser(nickname);
    const userId = user.user_id;
    const accessToken = jwt.sign(
      { user_id: user.user_id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshToken = jwt.sign(
      { user_id: user.user_id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_EXPIRES,
      }
    );
    await this.tokenRepository.setRefreshToken(refreshToken, userId);

    return { accessObject, refreshToken: refreshToken };
  };

  findOneUser = async (nickname) => {
    const findOneUserData = this.userRepository.findOneUser(nickname);
    return findOneUserData;
  };

  logout = async (user_id) => {
    await this.tokenRepository.deleteRefreshToken(user_id);
    return { message: "로그아웃 완료" };
  };
}

module.exports = UserService;

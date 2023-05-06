const { Users } = require("../models");

class UserRepository {
  createUser = async (nickname, password, email) => {
    const createUserData = await Users.create({
      nickname,
      password,
      email,
    });
    return createUserData;
  };

  findOneUser = async (nickname) => {
    const findOneUserData = await Users.findOne({
      where: { nickname: nickname },
    });
    return findOneUserData;
  };
}

module.exports = UserRepository;

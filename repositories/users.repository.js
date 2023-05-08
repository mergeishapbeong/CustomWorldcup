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

  findOneByUserId = async (user_id) => {
    const userInfo= await Users.findOne({
      where: { user_id },
    });
    return userInfo
  };
}

module.exports = UserRepository;

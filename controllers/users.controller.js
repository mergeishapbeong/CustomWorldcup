const UserService = require("../services/users.service");

class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { nickname, password, email } = req.body;
    try {
      const existsUsers = await this.userService.findOneUser(nickname);
      const existsEmail = await this.userService.findOneUser(email);

      if (existsUsers) {
        res.status(412).json({
          errorMessage: "중복된 닉네임입니다.",
        });
        return;
      }

      if (existsEmail) {
        res.status(412).json({
          errorMessage: "중복된 이메일입니다.",
        });
        return;
      }

      const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
      if (!nicknameFilter) {
        res.status(412).json({
          errorMessage: "닉네임의 형식이 일치하지 않습니다.",
        });
        return;
      }

      const emailFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
      if (!emailFilter) {
        res.status(412).json({
          errorMessage: "이메일의 형식이 일치하지 않습니다.",
        });
        return;
      }

      if (password.length < 4) {
        res.status(412).json({
          errorMessage: "패스워드 형식이 일치하지 않습니다.",
        });
        return;
      }

      if (password.includes(nickname)) {
        res.status(412).json({
          errorMessage: "패스워드에 닉네임이 포함되어 있습니다.",
        });
        return;
      }
      const signupData = await this.userService.signup(
        nickname,
        password,
        email
      );

      res.status(200).json(signupData);
    } catch (err) {
      res.status(400).json({
        errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
      });
    }
  };

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const user = await this.userService.findOneUser(nickname);
    try {
      if (!user || password !== user.password) {
        res.status(412).json({
          errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
        });
        return;
      }

      const userData = await this.userService.login(nickname);

      res.cookie(
        "Authorization",
        `${userData.accessObject.type} ${userData.accessObject.token}`
      );

      res.cookie("refreshToken", userData.refreshToken);
      res.status(200).json({
        Authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  };

  logout = async (req, res) => {
    const { user_id } = req.params;

    try {
      const logoutData = await this.userService.logout(user_id);
      res.clearCookie("Authorization");
      res.clearCookie("refreshToken");
      delete res.locals.user;
      res.status(200).json(logoutData);
    } catch (error) {
      res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
    }
  };
}

module.exports = UserController;

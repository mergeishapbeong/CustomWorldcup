const UserService = require("../services/users.service");
const nodemailer = require("nodemailer");

class UserController {
  userService = new UserService();

  signup = async (req, res) => {
    const { nickname, password, email } = req.body;
    try {
      const existsUsers = await this.userService.findOneUser(nickname);
      const existsEmail = await this.userService.findOneUser(email);
      const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
      const emailFilter = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);

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

      if (!nicknameFilter) {
        res.status(412).json({
          errorMessage: "닉네임의 형식이 일치하지 않습니다.",
        });
        return;
      }

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

      res.cookie("refreshtoken", userData.refreshToken);
      res.status(200).json({
        Authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
        refreshtoken: userData.refreshToken,
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

  emailAuth = async (req, res) => {
    const { email } = req.body;
    const emailFilter = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
    if (!emailFilter) {
      res.status(412).json({
        errorMessage: "이메일 형식이 일치하지 않습니다.",
      });
      return;
    }
    try {
      //템플릿 렌더링 연구 ㄱ
      // let emailTemplete;
      // ejs.renderFile(
      //   appDir + "/template/authMail.ejs",
      //   { authCode: authNum },
      //   function (err, data) {
      //     if (err) {
      //       console.log(err);
      //     }
      //     emailTemplete = data;
      //   }
      // );

      const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      // 6자리 난수 생성
      const authNumber = Math.floor(Math.random() * 888888) + 111111;

      const emailOption = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "[월드컵 어쩌고] 이메일 확인 인증번호 안내",
        text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
        연락처 이메일 👉 ${email}\n
        인증번호 6자리 👉 ${authNumber}`,
      };

      await transporter.sendMail(emailOption);
      res.status(200).json({
        message: `${email}주소로 인증 메일을 보냈습니다.`,
      });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ errorMessage: "인증 이메일 전송에 실패하였습니다." });
    }
  };
}

module.exports = UserController;

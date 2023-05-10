const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { Tokens } = require("../models");
const TokenRepository = require("../repositories/tokens.repository");

module.exports = async (req, res, next) => {
  const tokenRepository = new TokenRepository(Tokens);

  let { Authorization, refreshtoken } = req.headers;

  try {
    Authorization = !req.headers.refreshtoken
      ? req.cookies.Authorization
      : Authorization;

    refreshtoken = !req.headers.refreshtoken
      ? req.cookies.refreshtoken
      : refreshtoken;

    const [authType, accessToken] = (Authorization ?? "").split(" ");
    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshtoken);

    if (!isRefreshTokenValidate) {
      await tokenRepository.deleteRefreshToken2(refreshtoken);
      return res.status(419).json({
        message: "Refresh Token이 만료되었습니다. 다시 로그인 해주세요",
      });
    }

    if (!isAccessTokenValidate) {
      const userId = jwt.verify(refreshtoken, process.env.SECRET_KEY).user_id;

      const userR = await tokenRepository.getRefreshToken(userId);

      if (!userR) {
        return res.status(419).json({
          message:
            "Refresh Token의 정보가 서버에 존재하지 않습니다. 다시 로그인 해주세요",
        });
      }

      const newAccessToken = createAccessToken(userR);
      res.cookie("Authorization", `Bearer ${newAccessToken}`);

      const user = await Users.findOne({ where: { user_id: userId } });
      res.locals.user = user;
    } else {
      const userId = jwt.verify(accessToken, process.env.SECRET_KEY).user_id;

      const user = await Users.findOne({ where: { user_id: userId } });
      res.locals.user = user;
    }
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie("Authorization");
    return res.status(403).send({
      errorMessage:
        "전달된 쿠키에서 오류가 발생하였습니다. 다시 로그인 해주세요",
    });
  }
};

function createAccessToken(user) {
  const accessToken = jwt.sign(
    { user_id: user.user_id },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_EXPIRES,
    }
  );

  return accessToken;
}

function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

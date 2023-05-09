const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { Tokens } = require("../models");
const TokenRepository = require("../repositories/tokens.repository");

module.exports = async (req, res, next) => {
  const tokenRepository = new TokenRepository(Tokens);
  const { Authorization, refreshToken } = req.cookies;
  const [authType, accessToken] = (Authorization ?? "").split(" ");

  try {
    // refresh token 존재 여부 확인
    if (!refreshToken)
      return res.status(401).json({
        message: "Refresh Token이 존재하지 않습니다. 다시 로그인 해주세요.",
      });

    // access token 존재 여부 확인
    if (!accessToken)
      return res.status(401).json({
        message: "Access Token이 존재하지 않습니다. 다시 로그인 해주세요.",
      });

    // refresh token 유효성 확인
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);
    if (!isRefreshTokenValidate) {
      await tokenRepository.deleteRefreshToken2(refreshToken);
      return res.status(419).json({
        message: "Refresh Token이 만료되었습니다. 다시 로그인 해주세요",
      });
    }

    // access token 유효성 확인
    const isAccessTokenValidate = validateAccessToken(accessToken);
    if (authType !== "Bearer" || !isAccessTokenValidate) {
      // access token 재발급
      const user_id = jwt.verify(refreshToken, process.env.SECRET_KEY).user_id;
      const userPayload = await tokenRepository.getRefreshToken(user_id);

      if (!userPayload) {
        return res.status(419).json({
          message:
            "Refresh Token의 정보가 서버에 존재하지 않습니다. 다시 로그인 해주세요",
        });
      }

      const newAccessToken = createAccessToken(userPayload.dataValues);
      res.cookie("Authorization", `Bearer ${newAccessToken}`);
      res.locals.user = userPayload.dataValues;
    } else {
      const user_id = jwt.verify(accessToken, process.env.SECRET_KEY).user_id;
      const user = await Users.findOne({ where: { user_id } });
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
    console.log("validateRefreshToken err ==>", error);
    return false;
  }
}

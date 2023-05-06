const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { Tokens } = require("../models");
const TokenRepository = require("../repositories/tokens.repository");

module.exports = async (req, res, next) => {
  const tokenRepository = new TokenRepository(Tokens);
  const { Authorization, refreshToken } = req.cookies;
  const [authType, accessToken] = (Authorization ?? "").split(" ");

  if (!accessToken || authType !== "Bearer") {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  if (!refreshToken) {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  try {
    if (!refreshToken)
      return res
        .status(400)
        .json({ message: "Refresh Token이 존재하지 않습니다." });
    if (!Authorization)
      return res
        .status(400)
        .json({ message: "Access Token이 존재하지 않습니다." });

    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    const decodedToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    const userId = decodedToken.user_id;

    if (!isRefreshTokenValidate)
      return res
        .status(419)
        .json({ message: "Refresh Token이 만료되었습니다." });

    if (!isAccessTokenValidate) {
      const user = await tokenRepository.getRefreshToken(userId);

      if (!user) {
        return res.status(419).json({
          message: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
        });
      } else {
        const newAccessToken = createAccessToken(user);
        res.cookie("accessToken", newAccessToken);
        return res.json({ message: "Access Token을 새롭게 발급하였습니다." });
      }
    }

    const user = await Users.findOne({ where: { user_id: userId } });
    res.locals.user = user;
    next();
  } catch (err) {
    res.clearCookie("Authorization");
    return res.status(403).send({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다",
    });
  }
};

function createAccessToken(user) {
  const accessToken = jwt.sign(
    { userId: user.userId },
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

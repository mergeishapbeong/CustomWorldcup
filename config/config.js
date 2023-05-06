require("dotenv").config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const jwt = {
  secretKey: required("SECRET_KEY"),
  refreshExpiresIn: required("REFRESH_EXPIRES", "7d"),
  accessExpiresIn: required("ACCESS_EXPIRES", "2h"),
};
const bcrypt = {
  saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
};
const host = {
  port: parseInt(required("HOST_PORT")),
};
const development = {
  host: required("DB_HOST"),
  username: required("DB_USER"),
  database: required("DB_NAME"),
  password: required("DB_PASSWORD"),
  dialect: "mysql",
};
const test = {
  host: required("DB_HOST"),
  username: required("DB_USER"),
  database: required("DB_TEST_NAME"),
  password: required("DB_PASSWORD"),
  dialect: "mysql",
};
const production = {
  username: required("DB_USER"),
  password: required("DB_PASSWORD"),
  database: required("DB_NAME"),
  host: required("DB_HOST"),
  dialect: "mysql",
};

module.exports = { jwt, bcrypt, host, test, production };

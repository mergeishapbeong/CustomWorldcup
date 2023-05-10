const supertest = require("supertest");
const app = require("../../app");
const { sequelize } = require("../../models/index");

beforeAll(async () => {
  if (process.env.DB_NAME === "customWorldcup_test") {
    await sequelize.sync();
  } else {
    throw new Error(
      "DB_NAME이 customWorldcup_test 환경으로 설정되어 있지 않습니다."
    );
  }
});

describe("Layered Architecture Pattern, Comment Domain Integration Test", () => {});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.DB_NAME === "customWorldcup_test") {
    await sequelize.sync();
  } else {
    throw new Error(
      "DB_NAME이 customWorldcup_test 환경으로 설정되어 있지 않습니다."
    );
  }
});

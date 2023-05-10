const supertest = require("supertest");
const app = require("../../app.js");
const { sequelize } = require("../../models/index.js");

// 통합 테스트(Integration Test)를 진행하기에 앞서 Sequelize에 연결된 모든 테이블의 데이터를 삭제합니다.
//  단, NODE_ENV가 test 환경으로 설정되어있는 경우에만 데이터를 삭제합니다.
beforeAll(async () => {
  if (process.env.NODE_ENV === "test") await sequelize.sync();
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});

describe("Worldcups Domain 통합 테스트", () => {
  test("GET /api/worldcup API (getAllWorldcups) Integration Test Success Case, Not Found Posts Data", async () => {
    const response = await supertest(app)
      .get(`/api/posts`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send({}); // Request Body
  });

  test("GET /api/worldcup API (getAllWorldcups) Integration Test Success Case, Existing Worldcups Data", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("GET /api/worldcup/:worldcup_id API (getOneWorldcup) Integration Test Success Case, Not Found Worldcups Data", async () => {
    const response = await supertest(app)
      .get(`/api/posts`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send({}); // Request Body
  });

  test("GET /api/worldcup/:worldcup_id API (getOneWorldcup) Integration Test Success Case, Existing Worldcups Data", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
  
  test("POST /api/worldcup API (createWorldcup) Integration Test Success Case", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("POST /api/worldcup API (createWorldcup) Integration Test Error Case, Invalid Params Error", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("PATCH /api/worldcup/:worldcup_id API (updateWorldcup) Integration Test Success Case", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("PATCH /api/worldcup/:worldcup_id (updateWorldcup) Integration Test Error Case, Invalid Params Error", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("DELETE /api/worldcup/:worldcup_id API (deleteWorldcup) Integration Test Success Case", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test("DELETE /api/worldcup/:worldcup_id (deleteWorldcup) Integration Test Error Case, Not Found Worldcups Data Error", async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === "test") await sequelize.sync({ force: true });
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});
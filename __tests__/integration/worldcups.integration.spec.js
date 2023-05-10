const supertest = require("supertest");
const app = require("../../app.js");
const { sequelize } = require("../../models/index.js");

// 통합 테스트(Integration Test)를 진행하기에 앞서 Sequelize에 연결된 모든 테이블의 데이터를 삭제합니다.
// 단, NODE_ENV가 test 환경으로 설정되어있는 경우에만 데이터를 삭제합니다.
beforeAll(async () => {
  if (process.env.NODE_ENV === "test") await sequelize.sync();
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});

describe("Worldcups Domain 통합 테스트", () => {
  userData = {
    user_id: 1,
    nickname: "siwon",
    password: "1234",
    email: "siwon@naver.com",
  };

  test("GET /api/worldcup API (getAllWorldcups) Integration Test Error Case, Not Found Worldcups Data", async () => {
    const response = await supertest(app)
      .get(`/api/worldcup`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send({}); // Request Body

    /** POST /api/auth/signup API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. API의 Response는 아무런 데이터를 삽입하지 않은 상태이므로 { data: [] }의 형태를 가진다.
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      errorMessage: "월드컵 게시물이 존재하지 않습니다.",
    });
  });

  test("POST /api/auth/signup API (signup) Integration Test", async () => {
    const signupRequestBodyParams = {
      nickname: userData.nickname,
      password: userData.password,
      email: userData.email,
    };

    const response = await supertest(app)
      .get(`/api/auth/signup`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(signupRequestBodyParams); // Request Body

    /** GET /api/posts API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. 여기서 signupData { nickname, password, email }의 객체 형태를 가집니다.
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      signupData: signupRequestBodyParams
    });
  });

  test("POST /api/auth/login API (login) Integration Test", async () => {
    const loginRequestBodyParams = {
        nickname: userData.nickname,
        password: userData.password,
      };

    const response = await supertest(app)
      .get(`/api/auth/login`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(loginRequestBodyParams); // Request Body

    /** POST /api/auth/login API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. API 호출이 완료되면, Authorization과 refreshtoken 값을 cookie와 body 데이터로 전달한다.
    expect(response.status).toEqual(200);
  });

  test("POST /api/worldcup API (createWorldcup) Integration Test Success Case", async () => {
    const createWorldcupRequestBodyParams = {
      title: "고양이 월드컵!",
      content: "제일 귀여운 고양이 고르기",
      choices: [
        {
          choice_name: "고양이1",
          choice_url: "www.cat1.com",
        },
        {
          choice_name: "고양이2",
          choice_url: "www.cat2.com",
        },
      ],
    };

    const response = await supertest(app)
      .post(`/api/worldcup`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createWorldcupRequestBodyParams); // Request Body

    /** POST /api/worldcup API의 성공 케이스 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 201 Http Status Code를 반환한다.
    // 2-1. API의 Response는 { newWorldcup: newWorldcup }의 형식을 가집니다.
    // 2-2. 여기서 newWorldcup { worldcup_id, user_id, title, content, choices }의 객체 형태를 가집니다.
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject({
      newWorldcup: {
        worldcup_id: 1,
        user_id: userData.user_id,
        title: createWorldcupRequestBodyParams.title,
        content: createWorldcupRequestBodyParams.content,
        choices: createWorldcupRequestBodyParams.choices,
      },
    });
  });

  test("POST /api/worldcup API (createWorldcup) Integration Test Error Case, Invalid Params Error", async () => {
    const createWorldcupRequestBodyParamsByInvalidParamsError = {
      title: "Title_InvalidParamsError",
      content: "Content_InvalidParamsError",
    };

    const response = await supertest(app)
      .post(`/api/worldcup`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send(createWorldcupRequestBodyParamsByInvalidParamsError); // Request Body

    /** POST /api/worldcup API의 에러 케이스 검증 로직 **/
    // 1. API를 호출하였을 때, InvalidParamsError가 발생하여 400 Http Status Code를 반환합니다.
    // 2. API의 Response는 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.

    // 1. API를 호출하였을 때, InvalidParamsError가 발생하여 400 Http Status Code를 반환합니다.
    expect(response.status).toEqual(412);

    // 2. API의 Response는 { errorMessage: "InvalidParamsError" }의 형식을 가집니다.
    expect(response.body).toMatchObject({ errorMessage: "InvalidParamsError" });
  });

  test("GET /api/worldcup API (getAllWorldcups) Integration Test Success Case, Existing Worldcups Data", async () => {
    const createWorldcupRequestBodyParams = {
      title: "고양이 월드컵!",
      content: "제일 귀여운 고양이 고르기",
      choices: [
        {
          choice_name: "고양이1",
          choice_url: "www.cat1.com",
        },
        {
          choice_name: "고양이2",
          choice_url: "www.cat2.com",
        },
      ],
    };

    const response = await supertest(app)
      .get(`/api/worldcup`) // API의 HTTP Method & URL
      .query({}) // Request Query String
      .send({}); // Request Body

    /** GET /api/worldcup API의 검증 로직 **/
    // 1. API를 호출하였을 때, 성공적으로 실행할 경우 200 Http Status Code를 반환한다.
    // 2. API의 Response는 1개의 데이터를 생성한 상태이므로 { worldcups: [ { worldcup_id, user_id, nickname, title, content, likes, play_count, createdAt, updatedAt, choices }] }의 형태를 가진다.

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      worldcups: [
        {
          worldcup_id: 1,
          user_id: userData.user_id,
          nickname: userData.nickname,
          title: createWorldcupRequestBodyParams.title,
          content: createWorldcupRequestBodyParams.content,
          choices: createWorldcupRequestBodyParams.choices,
          likes: expect.anything(),
          play_count: expect.anything(),
          createdAt: expect.anything(),
          updatedAt: expect.anything(),
        },
      ],
    });
  });

  test("GET /api/worldcup/:worldcup_id API (getOneWorldcup) Integration Test Success Case, Not Found Worldcups Data", async () => {});

  test("GET /api/worldcup/:worldcup_id API (getOneWorldcup) Integration Test Success Case, Existing Worldcups Data", async () => {});

  test("PATCH /api/worldcup/:worldcup_id API (updateWorldcup) Integration Test Success Case", async () => {});

  test("PATCH /api/worldcup/:worldcup_id (updateWorldcup) Integration Test Error Case, Invalid Params Error", async () => {});

  test("DELETE /api/worldcup/:worldcup_id API (deleteWorldcup) Integration Test Success Case", async () => {});

  test("DELETE /api/worldcup/:worldcup_id (deleteWorldcup) Integration Test Error Case, Not Found Worldcups Data Error", async () => {});
});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === "test") await sequelize.sync({ force: true });
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});

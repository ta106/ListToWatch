const supertest = require("supertest");
const app = require("../../app");
const auth = require("../../auth");
const { verify } = require("jsonwebtoken");
describe("GET /api/v1/users", () => {
  test("should return 403 for unauthenticated access", async () => {
    await supertest(app).get("/api/v1/users/1").expect(403);
    await supertest(app)
      .get("/api/v1/users/1")
      .set({ authorization: "Bearer lksajflksdf  " })
      .expect(403);
  });
  test("should return user when a valid token is present", async () => {
    let token = auth.createAccessToken({ id: 1 });
    let res = await supertest(app)
      .get("/api/v1/users/1")
      .set({ authorization: `Bearer ${token}` })
      .expect(200);
    expect(res.body.id).toEqual(1);
  });
});

describe("POST /api/v1/users/login", () => {
  test("should return valid token ", async () => {
    let res = await supertest(app)
      .post("/api/v1/users/login")
      .send({
        email: "turki.harbi@hotmail.com",
        password: "123123",
      })
      .expect(200);
    let token = res.body;
    verify(token, process.env.ACCESS_TOKEN_SECERT);
  });
  test("should return status 401 for wrong email or password ", async () => {
    await supertest(app)
      .post("/api/v1/users/login")
      .send({
        email: "turki.esharbi@hotmail.com",
        password: "123123",
      })
      .expect(401);
    await supertest(app)
      .post("/api/v1/users/login")
      .send({
        email: "turki.harbi@hotmail.com",
        password: "sdf",
      })
      .expect(401);
  });
});
describe("PUT /api/v1/users", () => {
  test("should return a valid jwt token when a new user is created ", async () => {
    let res = await supertest(app)
      .put("/api/v1/users")
      .send({
        email: "turki.harbi.999@hotmail.com",
        name: "turki alharbi",
        password: "123213",
      })
      .expect(200);
    let token = verify(res.body, process.env.ACCESS_TOKEN_SECERT);
  });
  test("should return status 409 for confilct on existing email", async () => {
    const user = {
      email: "turki.harbi@hotmail.com",
      name: "turki alharbi",
      password: "123213",
    };
    let res = await supertest(app).put("/api/v1/users").send(user).expect(409);
  });
});

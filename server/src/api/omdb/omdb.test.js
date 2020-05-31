const app = require("../../app");
const supertest = require("supertest");
const auth = require("../../auth");
describe("GET /api/v1/omdb", () => {
  it("should return unauthrized when no token is present or invalid token", async () => {
    await supertest(app).get("/api/v1/omdb/tt2560140").expect(403);
    await supertest(app)
      .get("/api/v1/omdb/" + "tt2560140")
      .set({ authorization: "Bearer lksajflksdf  " })
      .expect(403);
  });
  it("should return imdb results when a correct token is present", async () => {
    let token = auth.createAccessToken({ id: 1 });
    let res = await supertest(app)
      .get("/api/v1/omdb/tt2560140")
      .set({ authorization: `Bearer ${token}` })
      .expect(200);
    expect(res.body.imdbID).toEqual("tt2560140");
  });
});
describe("Post /api/v1/omdb", () => {
  it("should return unauthrized when no token is present or invalid token", async () => {
    await supertest(app)
      .post("/api/v1/omdb")
      .send({
        search: "attack on titan",
        page: 1,
      })
      .expect(403);
    await supertest(app)
      .get("/api/v1/omdb/" + "tt2560140")
      .set({ authorization: "Bearer lksajflksdf  " })
      .send({
        search: "attack on titan",
        page: 1,
      })
      .expect(403);
  });
  it("should return imdb results when a correct token is present", async () => {
    let token = auth.createAccessToken({ id: 1 });
    let res = await supertest(app)
      .post("/api/v1/omdb/")
      .set({ authorization: `Bearer ${token}` })
      .send({ search: "attack", page: 1 })
      .expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

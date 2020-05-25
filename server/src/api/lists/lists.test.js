const supertest = require("supertest");
const app = require("../../app");
const auth = require("../../auth");
describe("GET /api/v1/lists/:id", () => {
  test("should return a list for an authenticated user", async () => {
    let token = auth.createAccessToken({ id: 1 });
    await supertest(app)
      .get("/api/v1/lists/1")
      .set({ authorization: `Bearer ${token}` })
      .expect(200);
  });
  test("should return 403 for an unauthenticated user", async () => {
    await supertest(app).get("/api/v1/lists/1").expect(403);
    await supertest(app)
      .get("/api/v1/lists/1")
      .set({ authorization: "Bearer lksajflksdf  " })
      .expect(403);
  });
});
describe("PUT /api/v1/lists", () => {
  test("should return id of created list", async () => {
    await addList();
  });
  test("should return 401 for adding a list to another user", async () => {
    let token = auth.createAccessToken({ id: 1 });
    let res = await supertest(app)
      .put("/api/v1/lists/")
      .set({ authorization: `Bearer ${token}` })
      .send({ name: "seead list", user_id: 2 })
      .expect(401);
  });
  test("should return 403 for adding a list by an unauthenticated user", async () => {
    let res = await supertest(app)
      .put("/api/v1/lists/")
      .send({ name: "seead list", user_id: 2 })
      .expect(403);
  });
});
describe("POST /api/v1/lists", () => {
  test("Should update list name for an authenticated user", async () => {
    let { res, token } = await addList();
    let test_lst = {
      id: res.body,
      name: "newName",
    };
    let response = await supertest(app)
      .post("/api/v1/lists")
      .set({ authorization: `Bearer ${token}` })
      .send(test_lst)
      .expect(200);

    response = await supertest(app)
      .get("/api/v1/lists/one/" + response.body)
      .set({ authorization: `Bearer ${token}` })
      .expect(200);

    expect(response.body.name).toEqual(test_lst.name);
  });
  test("Should return 401 for modifying another user's record", async () => {
    let { res } = await addList();
    let token = auth.createAccessToken({ id: 2 });

    let test_lst = {
      id: res.body,
      name: "newName",
    };
    let response = await supertest(app)
      .post("/api/v1/lists")
      .set({ authorization: `Bearer ${token}` })
      .send(test_lst)
      .expect(401);
  });
});
describe("DELETE /api/v1/lists", () => {
  test("Should return 401 for modifying another user's record ", async () => {
    let { res } = await addList();
    let token = auth.createAccessToken({ id: 2 });
    res = await supertest(app)
      .delete("/api/v1/lists/" + res.body)
      .set({ authorization: `Bearer ${token}` })
      .expect(401);
  });

  test("Should return 'Deleted!'  ", async () => {
    let { res, token } = await addList();
    res = await supertest(app)
      .delete("/api/v1/lists/" + res.body)
      .set({ authorization: `Bearer ${token}` })
      .expect(200);
  });
});

async function addList() {
  let token = auth.createAccessToken({ id: 1 });
  let res = await supertest(app)
    .put("/api/v1/lists/")
    .set({ authorization: `Bearer ${token}` })
    .send({
      user_id: 1,
      name: "test list",
    })
    .expect(200);
  return { res, token };
}

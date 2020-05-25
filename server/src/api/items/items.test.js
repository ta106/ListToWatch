const supertest = require("supertest");
const app = require("../../app");
const auth = require("../../auth");
const { verify } = require("jsonwebtoken");

describe("GET /api/v1/items", () => {
  let token = auth.createAccessToken({ id: 1 });

  test("should return list of items in list", async () => {
    let res = await supertest(app)
      .get("/api/v1/items/1")
      .set({ authorization: `Bearer ${token}` })
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });
  test("should return 403 for unauth user", async () => {
    await supertest(app).get("/api/v1/items/1").expect(403);
  });
});
describe("PUT /api/v1/items", () => {
  test("should return id of created list", async () => {
    await addItem();
  });

  test("should return 403 for adding a list by an unauthenticated user", async () => {
    await supertest(app)
      .put("/api/v1/items/")
      .send({
        imdbID: "test",
        name: "test item",
        img_url: "test.jpg",
        type_id: 1,
      })
      .expect(403);
  });
});
describe("PUT /api/v1/items/inlist", () => {
  test("Should return 401 for modifying another user's record ", async () => {
    let { res } = await addList();
    let response = (await addItem()).res;

    let token = auth.createAccessToken({ id: 2 });
    res = await supertest(app)
      .put("/api/v1/items/inlist")
      .send({
        item_id: response.body,
        list_id: res.body,
      })
      .set({ authorization: `Bearer ${token}` })
      .expect(401);
  });
  test("Should return 'Added!'  ", async () => {
    let { res, token } = await addList();
    let response = (await addItem()).res;

    res = await supertest(app)
      .put("/api/v1/items/inlist")
      .set({ authorization: `Bearer ${token}` })
      .send({
        item_id: response.body,
        list_id: res.body,
      })
      .expect(200);
  });
});
describe("POST /api/v1/items/rate", () => {
  test('should return "Rated!" ', async () => {
    let { res, token } = await addItem();
    let response = await supertest(app)
      .post("/api/v1/items/rate")
      .set({ authorization: `Bearer ${token}` })

      .send({
        id: res.body,
        stars: 4.5,
      })
      .expect(200);
    expect(response.body).toEqual("Rated!");
  });
});

async function addItem() {
  let token = auth.createAccessToken({ id: 1 });
  let res = await supertest(app)
    .put("/api/v1/items/")
    .set({ authorization: `Bearer ${token}` })
    .send({
      imdbID: "test" + Date.now().toString(),
      name: "test item",
      img_url: "test.jpg",
      type_id: 1,
    })
    .expect(200);
  return { res, token };
}
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

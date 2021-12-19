const mocha = require("mocha");
const request = require("supertest");
const assert = require("assert");

const { getServer, getUserData, getCategoryData, getPostData } = require("../utils");

const { describe, it, beforeEach, before } = mocha;

describe("category api test", () => {
  const app = getServer();
  const req = request(app);
  const root = "/api/categories";

  const userData = getUserData();
  let token;
  beforeEach("set user signup and login", async () => {
    const params = {
      email: userData.email,
      password: userData.password,
      nick: userData.nick,
    };

    
    await req
      .post(`/api/users/signup`)
      .send(params);
    
    const res = await req
      .post(`/api/users/login`)
      .send(params);
    
    const { response } = res.body;
    token = response.token;
  });

  describe("create category POST /api/categories", async () => {
    const apiPath = `${root}`;

    it("success: create category - 200", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title,
      }

      const res = await req
        .post(apiPath)
        .auth(token, { type: "bearer" })
        .send(params)
        .expect(200);
      
      const { success, response } = res.body;
      const { title } = response;
      assert.deepEqual(success, true);
      assert.deepEqual(title, params.title);
    });

    it("fail: title is required - 400", async () => {
      const categoryData = getCategoryData();
      const params = {}

      const res = await req
        .post(apiPath)
        .auth(token, { type: "bearer" })
        .send(params)
        .expect(400);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Title is required.");
    });
    
    it("fail: title is too long - 400", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: "abcdefghijklmnopqrstuvwxyz"
      }

      const res = await req
        .post(apiPath)
        .auth(token, { type: "bearer" })
        .send(params)
        .expect(400);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Title is invalid.");
    });

    it("fail: title is only english - 400", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title.concat("1")
      }

      const res = await req
        .post(apiPath)
        .auth(token, { type: "bearer" })
        .send(params)
        .expect(400);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Title is invalid.");
    });

    it("fail: unauthorized - 401", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title
      }

      const res = await req
        .post(apiPath)
        .send(params)
        .expect(401);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Access is denied.");
    });
  });

  describe("read all category GET /api/categories", async () => {
    const apiPath = `${root}`;

    it("success: read all category - 200", async () => {
      const res = await req
        .get(apiPath)
        .auth(token, { type: "bearer" })
        .expect(200);
      
      const { success, response } = res.body;
      assert.deepEqual(success, true);
      assert.deepEqual(response.length, 5);
    });

    it("fail: unauthorized - 401", async () => {
      const res = await req
        .get(apiPath)
        .expect(401);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Access is denied.");
    });
  });

  describe("read one category GET /api/categories/:categoryId", async () => {
    let categorySample;

    before("set category", async () => {
      const categoryData = getCategoryData();
      let params = {
        title: categoryData.title,
      }

      const res = await req
        .post("/api/categories")
        .auth(token, { type: "bearer" })
        .send(params);
      
      const { response } = res.body;
      categorySample = response;

      const postData = getPostData();
      params = {
        categoryId: categorySample.id,
        title: postData.title,
        content: postData.content
      }
      await req
        .post("/api/posts")
        .auth(token, { type: "bearer" })
        .send(params)
    });
    it("success: read one category - 200", async () => {
      const res = await req
        .get(`${root}/${categorySample.id}`)
        .auth(token, { type: "bearer" })
        .expect(200);
      
      const { success, response } = res.body;
      assert.deepEqual(success, true);
      assert.deepEqual(response.category, categorySample);
      assert.deepEqual(response.posts.length, 1);
    });

    it("fail: unauthorized - 401", async () => {
      const res = await req
        .get(`${root}/${categorySample.id}`)
        .expect(401);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Access is denied.");
    });
  });

  describe("update category PUT /api/categories/:categoryId", async () => {
    let categorySample;
    
    beforeEach("set category", async () => {
      const categoryData = getCategoryData();
      let params = {
        title: categoryData.title,
      }

      const res = await req
        .post("/api/categories")
        .auth(token, { type: "bearer" })
        .send(params);
      
      const { response } = res.body;
      categorySample = response;

      const postData = getPostData();
      params = {
        categoryId: categorySample.id,
        title: postData.title,
        content: postData.content
      }
      await req
        .post("/api/posts")
        .auth(token, { type: "bearer" })
        .send(params)
    });

    it("success: update category - 200", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title,
      }
      const res = await req
        .put(`${root}/${categorySample.id}`)
        .auth(token, { type: "bearer" })
        .send(params)
        .expect(200);
      
      const { success, response } = res.body;
      const { updated } = response
      assert.deepEqual(success, true);
      assert.deepEqual(updated.title, params.title);
    });

    it("fail: unauthorized - 401", async () => {
      const res = await req
        .put(`${root}/${categorySample.id}`)
        .expect(401);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Access is denied.");
    });
  });

  describe("delete category DELETE /api/categories/:categoryId", async () => {
    let categorySample;
    
    beforeEach("set category", async () => {
      const categoryData = getCategoryData();
      let params = {
        title: categoryData.title,
      }

      const res = await req
        .post("/api/categories")
        .auth(token, { type: "bearer" })
        .send(params);
      
      const { response } = res.body;
      categorySample = response;

      const postData = getPostData();
      params = {
        categoryId: categorySample.id,
        title: postData.title,
        content: postData.content
      }
      await req
        .post("/api/posts")
        .auth(token, { type: "bearer" })
        .send(params)
    });

    it("success: delete category - 200", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title,
      }
      const res = await req
        .delete(`${root}/${categorySample.id}`)
        .auth(token, { type: "bearer" })
        .expect(200);
      
      const { success, response } = res.body;
      const { deleted } = response
      assert.deepEqual(success, true);
      assert.deepEqual(deleted.deletedCount, 1);
    });

    it("fail: unauthorized - 401", async () => {
      const res = await req
        .delete(`${root}/${categorySample.id}`)
        .expect(401);
      
      const { success, error } = res.body;
      assert.deepEqual(success, false);
      assert.deepEqual(error.message, "Access is denied.");
    });
  });
});
// const mocha = require("mocha");
// const request = require("supertest");
// const assert = require("assert");

// const { getServer, getUserData, getPostData } = require("../utils");

// const { describe, it, beforeEach } = mocha;

// describe("post api test", () => {
//   const app = getServer();
//   const req = request(app);
//   const root = "/api/posts";

//   const userData = getUserData();
//   let token;
//   beforeEach("set user signup and login", async () => {
//     const params = {
//       email: userData.email,
//       password: userData.password,
//       nick: userData.nick,
//     };

//     await req
//       .post(`/api/users/signup`)
//       .send(params);

//     const res = await req
//       .post(`/api/users/login`)
//       .send(params);
    
//     const { response } = res.body;
//     token = response.token;
//   });

//   describe("create post POST /api/posts", () => {
//     const apiPath = `${root}`;

//     it("success: create post - 200", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);
      
//       const { success, response } = res.body;
//       const { title, content } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(title, params.title);
//       assert.deepEqual(content, params.content);
//     });
    
//     it("fail: unauthorized - 401", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });

//     it("fail: title is required - 400", async () => {
//       const postData = getPostData();
//       const params = {
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Title is required.");
//     });

//     it("fail: content is required - 400", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Content is required.");
//     });
//   });
  
//   describe("read post GET /api/posts", () => {
//     const apiPath = `${root}`;
//     let postId;
//     let testPost;
    
//     beforeEach("set create post", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);
      
//       const { response } = res.body;
//       postId = response.id;
//       testPost = {
//         title: response.title,
//         content: response.content,
//       };
//     });

//     it("success: read post all - 200", async () => {
//       const res = await req
//         .get(apiPath)
//         .auth(token, { type: "bearer" })
//         .expect(200);
      
//       const { success, response } = res.body;
//       assert.deepEqual(success, true);
//       assert.deepEqual(response.length, 2);
//     });

//     it("success: read post one - 200", async () => {
//       const res = await req
//         .get(apiPath)
//         .query({ postId })
//         .auth(token, { type: "bearer" })
//         .expect(200);
      
//       const { success, response } = res.body;
//       assert.deepEqual(success, true);
//       assert.deepEqual(response.title, testPost.title);
//       assert.deepEqual(response.content, testPost.content);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const res = await req
//         .get(apiPath)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     })
//   });
  
//   describe("update post PUT /api/posts", () => {
//     const apiPath = `${root}`;
//     let postId;
    
//     beforeEach("set create post", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);
      
//       const { response } = res.body;
//       postId = response.id;
//     });

//     it("success: update post - 200", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content
//       }

//       const res = await req
//         .put(apiPath)
//         .query({ postId })
//         .send(params)
//         .auth(token, { type: "bearer" })
//         .expect(200);
      
//       const { success, response } = res.body;
//       const { updated } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(updated.title, params.title)
//       assert.deepEqual(updated.content, params.content)
//     });

//     it("fail: post id is required - 400", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content
//       }

//       const res = await req
//         .put(apiPath)
//         .send(params)
//         .auth(token, { type: "bearer" })
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Post id is required.")
//     });

//     it("fail: title is required - 400", async () => {
//       const postData = getPostData();
//       const params = {
//         content: postData.content
//       }

//       const res = await req
//         .put(apiPath)
//         .query({ postId })
//         .send(params)
//         .auth(token, { type: "bearer" })
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Title is required.");
//     });

//     it("fail: content is required - 400", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//       }

//       const res = await req
//         .put(apiPath)
//         .query({ postId })
//         .send(params)
//         .auth(token, { type: "bearer" })
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Content is required.");
//     });
//   });

//   describe("delete post DELETE /api/posts", () => {
//     const apiPath = `${root}`;
//     let postId;
    
//     beforeEach("set create post", async () => {
//       const postData = getPostData();
//       const params = {
//         title: postData.title,
//         content: postData.content,
//       }

//       const res = await req
//         .post(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);
      
//       const { response } = res.body;
//       postId = response.id;
//     });

//     it("success: delete post - 200", async () => {
//       const res = await req
//         .delete(apiPath)
//         .query({ postId })
//         .auth(token, { type: "bearer" })
//         .expect(200);
      
//       const { success, response } = res.body;
//       const { deleted } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(deleted.deletedCount, 1);
//     });

//     it("fail: post id is required - 400", async () => {
//       const res = await req
//         .delete(apiPath)
//         .auth(token, { type: "bearer" })
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Post id is required.");
//     });
//   });
// });
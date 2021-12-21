// const mocha = require("mocha");
// const request = require("supertest");
// const assert = require("assert");

// const { getServer, getUserData, getCategoryData, getPostData, getCommentData } = require("../utils");

// const { describe, it, beforeEach, before } = mocha;

// describe("comments api test", () => {
//   const app = getServer();
//   const req = request(app);
//   const root = "/api/comments";

//   const userData = getUserData();
//   let token;

//   before("set user signup and login", async () => {
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

//   const categoryData = getCategoryData();
//   let category;
//   before("set category", async () => {
//     const params = {
//       title: categoryData.title,
//     };

//     const res = await req
//       .post(`/api/categories`)
//       .auth(token, { type: "bearer" })
//       .send(params);
    
//     const { response } = res.body;
//     category = response;
//   });

//   const postData = getPostData();
//   let post;
//   before("set post", async () => {
//     const params = {
//       categoryId: category.id,
//       title: postData.title,
//       content: postData.content,
//     }

//     const res = await req
//       .post(`/api/posts`)
//       .auth(token, { type: "bearer" })
//       .send(params);
    
//     const { response } = res.body;
//     post = response;
//   });

//   let comment;
//   describe("create comment POST /api/comments", async () => {
//     const apiPath = `${root}`;

//     it("success: create comment - 200", async () => {
//       const commentData = getCommentData();
//       const params = {
//         content: commentData.content,
//       };

//       const res = await req
//         .post(`${apiPath}/${post.id}`)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);

//       const { success, response } = res.body;
//       const { postId, content } = response;
//       comment = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(postId, post.id);
//       assert.deepEqual(content, params.content);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const commentData = getCommentData();
//       const params = {
//         content: commentData.content,
//       };

//       const res = await req
//         .post(`${apiPath}/${post.id}`)
//         .send(params)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });

//     it("fail: content is required - 400", async () => {
//       const params = {};

//       const res = await req
//         .post(`${apiPath}/${post.id}`)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Content is required.");
//     });
//   });

//   describe("read user comment GET /api/comments", async () => {
//     const apiPath = `${root}`;

//     it("success: read comment - 200", async () => {
//       const res = await req
//         .get(apiPath)
//         .auth(token, { type: "bearer" })
//         .expect(200);

//       const { success, response } = res.body;
//       const { postId, comments } = response[0];
//       assert.deepEqual(success, true);
//       assert.deepEqual(postId, post.id);
//       assert.deepEqual(comments.length, 1);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const res = await req
//         .get(apiPath)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });
//   });

//   describe("read post comment GET /api/comments/:postId", async () => {
//     const apiPath = `${root}`;

//     it("success: read comment - 200", async () => {
//       const res = await req
//         .get(`${apiPath}/${post.id}`)
//         .auth(token, { type: "bearer" })
//         .expect(200);

//       const { success, response } = res.body;
//       const { postId, content } = response[0];
//       assert.deepEqual(success, true);
//       assert.deepEqual(postId, post.id);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const res = await req
//         .get(`${apiPath}/${post.id}`)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });
//   });

//   describe("delete comment GET /api/comments/:commentId", async () => {
//     const apiPath = `${root}`;

//     it("success: delete comment - 200", async () => {
//       const res = await req
//         .delete(`${apiPath}/${comment.id}`)
//         .auth(token, { type: "bearer" })
//         .expect(200);

//       const { success, response } = res.body;
//       const { deleted } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(deleted.deletedCount, 1);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const res = await req
//         .get(`${apiPath}/${comment.id}`)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });
//   });
// });
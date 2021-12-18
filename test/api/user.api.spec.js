// const mocha = require("mocha");
// const request = require("supertest");
// const assert = require("assert");

// const { getServer, getUserData } = require("../utils");

// const { describe, it, beforeEach } = mocha;

// describe("user api test", () => {
//   const app = getServer();
//   const req = request(app);
//   const root = "/api/users";

//   describe("user signup POST /api/users/signup", () => {
//     const apiPath = `${root}/signup`;
    
//     it("success: create user - 200", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email,
//         password: userData.password,
//         nick: userData.nick
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(200);
      
//       const { success, response } = res.body;
//       assert.deepEqual(success, true);
//       assert.deepEqual(response, true);
//     });

//     it("fail: email is required - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         password: userData.password,
//         nick: userData.nick,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Email is required.");
//     });

//     it("fail: email is invalid - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email.split("@").join(""),
//         password: userData.password,
//         nick: userData.nick,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Email is invalid.");
//     });

//     it("fail: password is required - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email,
//         nick: userData.nick,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password is required.");
//     });

//     it("fail: password is too short - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email,
//         password: userData.password.slice(0, 7),
//         nick: userData.nick,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password must be 8-16 characters long.");
//     });

//     it("fail: password is too long - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email,
//         password: userData.password.repeat(2).slice(0, 17),
//         nick: userData.nick,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password must be 8-16 characters long.");
//     });

//     it("fail: nick is required - 400", async () => {
//       const userData = getUserData();
//       const params = {
//         email: userData.email,
//         password: userData.password,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400)
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Nick is required.");
//     });
//   });

//   describe("user login POST /api/users/login", () => {
//     const apiPath = `${root}/login`;
//     const userData = getUserData();

//     beforeEach("set user signup", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password,
//         nick: userData.nick,
//       };

//       await req
//         .post(`${root}/signup`)
//         .send(params)
//     });

//     it("success: user login - 200", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(200);
      
//       const { success, response } = res.body;
//       assert.deepEqual(success, true);
//       assert.ok(response.token);
//     });

//     it("fail: email is required - 400", async () => {
//       const params = {
//         password: userData.password,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Email is required.");
//     });

//     it("fail: email is invalid - 400", async () => {
//       const params = {
//         email: userData.email.split("@").join(""),
//         password: userData.password,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Email is invalid.");
//     });

//     it("fail: password is invalid - 400", async () => {
//       const params = {
//         email: userData.email,
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password is required.");
//     });

//     it("fail: password is too short - 400", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password.slice(0, 7)
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password must be 8-16 characters long.");
//     });

//     it("fail: password is too long - 400", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password.repeat(2).slice(0, 17)
//       }

//       const res = await req
//         .post(apiPath)
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Password must be 8-16 characters long.");
//     });
//   });

//   describe("nick update PUT /api/users/nick", () => {
//     const apiPath = `${root}/nick`;
//     const userData = getUserData();
//     let token;

//     beforeEach("set user signup and login", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password,
//         nick: userData.nick,
//       };

//       await req
//         .post(`${root}/signup`)
//         .send(params);

//       const res = await req
//         .post(`${root}/login`)
//         .send(params);
      
//       const { response } = res.body;
//       token = response.token;
//     });

//     it("success: nick update - 200", async () => {
//       const params = {
//         nick: userData.nick,
//       };

//       const res = await req
//         .put(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(200);
      
//       const { success, response } = res.body;
//       const { updated } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(updated.nick, params.nick);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const params = {
//         nick: userData.nick,
//       };

//       const res = await req
//         .put(apiPath)
//         .send(params)
//         .expect(401);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Access is denied.");
//     });

//     it("fail: nick is required - 400", async () => {
//       const params = {};

//       const res = await req
//         .put(apiPath)
//         .auth(token, { type: "bearer" })
//         .send(params)
//         .expect(400);
      
//       const { success, error } = res.body;
//       assert.deepEqual(success, false);
//       assert.deepEqual(error.message, "Nick is required.");
//     });
//   });

//   describe("user delete DELETE /api/users", () => {
//     const apiPath = `${root}`;
//     const userData = getUserData();
//     let token;

//     beforeEach("set user signup and login", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password,
//         nick: userData.nick,
//       };

//       await req
//         .post(`${root}/signup`)
//         .send(params);

//       const res = await req
//         .post(`${root}/login`)
//         .send(params);
      
//       const { response } = res.body;
//       token = response.token;
//     });

//     it("success: delete user - 200", async () => {
//       const res = await req
//         .delete(apiPath)
//         .auth(token, { type: "bearer" })
//         .expect(200);
      
//       const { success, response } = res.body;
//       const { deleted } = response;
//       assert.deepEqual(success, true);
//       assert.deepEqual(deleted.deletedCount, 1);
//     });

//     it("fail: unauthorized - 401", async () => {
//       const res = await req
//         .delete(apiPath)
//         .expect(401);
      
//         const { success, error } = res.body;
//         assert.deepEqual(success, false);
//         assert.deepEqual(error.message, "Access is denied.");
//     });
//   });
// })
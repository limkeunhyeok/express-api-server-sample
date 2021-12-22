// require("dotenv").config();

// const mocha = require("mocha");
// const assert = require("assert");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const UserRepository = require("../../src/repositories/user.repository");
// const UserService = require("../../src/services/user.service");

// const { BadRequestException } = require("../../src/common/exceptions")

// const { getUserData } = require("../utils");

// const { describe, it, before } = mocha;


// describe("user service test", () => {
//   const userRepository = new UserRepository();
//   const userService = new UserService(userRepository);

//   const userData = getUserData();
//   let user;
//   describe("signup test", () => {
//     it("success: create user and encrypted password", async () => {
//       const result = await userService.signUp(userData);
//       user = result;

//       assert.deepEqual(userData.email, result.email);
//       assert.deepEqual(userData.nick, result.nick);
      
//       const isValidPassword = await bcrypt.compare(userData.password, result.password);
//       assert.deepEqual(isValidPassword, true);
//     });

//     it("fail: already registered user", async () => {
//       const registeredUserData = getUserData();
//       await userService.signUp(registeredUserData);

//       try {
//         await userService.signUp(registeredUserData);
//       } catch (error) {
//         assert.deepEqual(error, new BadRequestException("Email is already registered."));
//       };
//     });
//   });

//   describe("login test", () => {
//     it("success: login user and get token", async () => {
//       const params = {
//         email: userData.email,
//         password: userData.password
//       };

//       const token = await userService.login(params);
//       assert.ok(token);

//       const data = await jwt.verify(token, process.env.JWT_SECRET);
//       assert.deepEqual(data.userId, user.id);
//       assert.deepEqual(data.nick, user.nick);
//     });

//     it("fail: email or password is incorrect", async () => {
//       const fakeUser = getUserData();
  
//       try {
//         const params = {
//           email: fakeUser.email,
//           password: userData.password
//         };

//         await userService.login(params);
//       } catch (error) {
//         assert.deepEqual(error, new BadRequestException("Email or password is incorrect."));
//       };

//       try {
//         const params = {
//           email: userData.email,
//           password: fakeUser.password
//         };

//         await userService.login(params);
//       } catch (error) {
//         assert.deepEqual(error, new BadRequestException("Email or password is incorrect."));
//       };
//     });

//   });

//   describe("updated test", () => {
//     it("success: updated user nick", async () => {
//       const updatedUserData = getUserData();
//       const params = {
//         id: user.id,
//         nick: updatedUserData.nick
//       }

//       const updated = await userService.updateNick(params);
//       assert.deepEqual(updated.nick, params.nick);
//     });

//     it("success: updated user password", async () => {
//       const updatedUserData = getUserData();
//       const params = {
//         id: user.id,
//         password: updatedUserData.password
//       }

//       const updated = await userService.updatePassword(params);
//       const isValidPassword = await bcrypt.compare(updatedUserData.password, updated.password);
//       assert.deepEqual(isValidPassword, true);
//     });
//   });

//   describe("deleted test", () => {
//     it("success: deleted user", async () => {
//       const params = {
//         id: user.id,
//       };

//       const deleted = await userService.deleteUser(params);
//       assert.deepEqual(deleted.deletedCount, 1);
//     });
//   });
// });
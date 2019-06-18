const request = require("supertest");
const assert = require("chai").assert;
const express = require("express");
const account = require("../../routes/api/account");
const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/account", account);

describe("API Account", function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(10000);

  describe("POST /api/account/signup", function() {
    it("Should create new user if one does not exist yet", function() {
      const payload = {
        username: "NewUsername",
        email: "emailfor@newusername.com",
        password: "ksjfdlsjf"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .then(res => {
          assert.isTrue(res.body.success);
          User.findOne({ username: payload.username }, (err, doc) => {
            assert.equal(payload.username, doc.username);
          });
        })
        .catch(err => console.error(err));
    });

    it.skip("Should respond with status 201 if user is signed up", function() {
      const payload = {
        username: "Expect201User",
        email: "emailfor201@expect.com",
        password: "askdjalkd"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .set({
          "Content-Type": "application/json"
        })
        .expect(201);
    });

    it.skip("Should respond with status 400 if Content-Type is not application/json", function() {
      const payload = {
        username: "Expect400User",
        email: "emailfor400@expect.com",
        password: "askdjalkd"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no body", function() {
      return request(app)
        .post("/api/account/signup")
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no email", function() {
      const payload = {
        username: "Expect400User",
        password: "askdjalkd"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no username", function() {
      const payload = {
        email: "emailfor400@expect.com",
        password: "askdjalkd"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no password", function() {
      const payload = {
        username: "Expect400User",
        email: "emailfor400@expect.com"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if password length less than 6 chars", function() {
      const payload = {
        username: "Expect400User",
        email: "emailfor400@expect.com",
        password: "qwe"
      };
      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if username is not unique", function() {
      firstUser = new User();
      firstUser.username = "notunique";
      firstUser.email = "unique@colors.com";
      firstUser.password = firstUser.generateHash("qwerty");

      const payload = {
        username: "notunique",
        email: "email@colors.com",
        password: "askdjalkd"
      };

      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if email is not unique", function() {
      firstUser = new User();
      firstUser.username = "unique";
      firstUser.email = "notunique@colors.com";
      firstUser.password = firstUser.generateHash("qwerty");

      const payload = {
        username: "unique2",
        email: "notunique@colors.com",
        password: "askdjalkd"
      };

      return request(app)
        .post("/api/account/signup")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });
  });

  describe("POST /api/account/signin", function() {
    it("Should sign in the user if credentials are valid", function() {
      const user = new User();
      user.username = "NewUsername00";
      user.email = "newusername@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "NewUsername00",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200)
        .then(res => {
          const { body } = res;
          assert.isTrue(body.success);
          assert.equal(body.username, user.username);
        });
    });

    it("Should return session token if signed in", function() {
      const user = new User();
      user.username = "TokenTest";
      user.email = "tokentest@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "TokenTest",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200)
        .then(res => {
          const { body } = res;
          assert.lengthOf(body.token, 24);
        });
    });

    it("Should create user session if signed in", function() {
      const user = new User();
      user.username = "SessionTest";
      user.email = "sessiontest@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "SessionTest",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200)
        .then(res => {
          const { body } = res;
          assert.isTrue(body.success);
          UserSession.findById(body.token, (err, doc) => {
            assert.equal(doc._id, body.token);
          });
        });
    });

    it.skip("Should not sign in the user if credentials are invalid", function() {
      const payload = {
        username: "InvalidUsername",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400)
        .then(res => {
          const { body } = res;
          assert.isFalse(body.success);
        });
    });

    it("Should accept applicaton/json", function() {
      const user = new User();
      user.username = "ApplicationJson";
      user.email = "applicationjson@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "ApplicationJson",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(200);
    });

    it.skip("Should respond with status 400 if no body", function() {
      return request(app)
        .post("/api/account/signin")
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no username", function() {
      const payload = {
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if no password", function() {
      const payload = {
        username: "username"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400);
    });

    it.skip("Should respond with status 400 if username is invalid", function() {
      const user = new User();
      user.username = "ValidUsername";
      user.email = "validusername@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "InvalidUsername",
        password: "qwerty"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400)
        .then(res => {
          const { body } = res;
          assert.isFalse(body.success);
          assert.equal(body.username.message, "Invalid username.");
        });
    });

    it.skip("Should respond with status 400 if password is invalid", function() {
      const user = new User();
      user.username = "newuser001";
      user.email = "user001@colors.com";
      user.password = user.generateHash("qwerty");
      user.save();

      const payload = {
        username: "newuser001",
        password: "qwert"
      };

      return request(app)
        .post("/api/account/signin")
        .send(payload)
        .set({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .expect(400)
        .then(res => {
          const { body } = res;
          assert.isFalse(body.success);
          assert.equal(body.password.message, "Invalid password.");
        });
    });
  });

  describe("GET /api/account/verify", function() {
    it("Should verify user by token");
    it("Should not verify user if no token");
    it("Should respond with status 200 if token is verified");
    it("Should respond with status 400 if no token");
    it("Should respond with status 400 if token is invalid");
  });

  describe("GET /api/account/logout", function() {
    it("Should logout the user by token");
    it("Should respond with status 400 if no token");
  });
});

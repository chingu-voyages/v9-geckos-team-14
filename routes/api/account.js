const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

// @route POST api/account/signup
// @desc User signup form
// @access Public
router.post("/signup", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  const { username } = body;
  let { email } = body;
  let readyToProceed = true;

  const result = {
    success: false,
    message: "",
    email: {
      ok: true,
      message: ""
    },
    username: {
      ok: true,
      message: ""
    },
    password: {
      ok: true,
      message: ""
    }
  };

  if (!email) {
    readyToProceed = false;
    result.email.ok = false;
    result.email.message = "Email is required.";
  }

  if (!username) {
    readyToProceed = false;
    result.username.ok = false;
    result.username.message = "Username is required.";
  }

  if (!password || password.length < 6) {
    readyToProceed = false;
    result.password.ok = false;
    result.password.message = "Minimum 6 characters long.";
  }

  if (!readyToProceed) {
    return res.send(result);
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    { $or: [{ email: email }, { username: username }] },
    (err, users) => {
      if (err) {
        result.message = "Server error.";
        return res.send(result);
      } else if (users.length > 0) {
        users.map(user => {
          if (user.email == email) {
            result.email = {
              ok: false,
              message: "This email already exists."
            };
          }
          if (user.username == username) {
            result.username = {
              ok: false,
              message: "This username already exists."
            };
          }
        });
        return res.send(result);
      }

      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          result.message = "Server error";
          return res.send(result);
        }
        result.success = true;
        result.message = "Signed up";
        return res.send(result);
      });
    }
  );
});

// @route POST api/account/signin
// @desc User signin form
// @access Public
router.post("/signin", (req, res, next) => {
  const { body } = req;
  const { username, password } = body;
  let readyToProceed = true;

  const result = {
    success: false,
    message: "",
    username: {
      ok: true,
      message: ""
    },
    password: {
      ok: true,
      message: ""
    },
    token: ""
  };

  if (!username) {
    readyToProceed = false;
    result.username.ok = false;
    result.username.message = "Username is required.";
  }

  if (!password) {
    readyToProceed = false;
    result.password.ok = false;
    result.password.message = "Password is required.";
  }

  if (!readyToProceed) {
    return res.send(result);
  }

  User.find({ username }, (err, users) => {
    if (err) {
      result.message = "Server error";
      return res.send(result);
    }

    if (users.length != 1) {
      result.username.message = "Invalid username";
      result.username.ok = false;
      return res.send(result);
    }

    const user = users[0];
    if (!user.validPassword(password)) {
      result.password.message = "Invalid password";
      result.password.ok = false;
      return res.send(result);
    }

    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        result.message = "Server error";
        return res.send(result);
      }

      result.success = true;
      result.message = "Singed in";
      result.token = doc._id;
      return res.send(result);
    });
  });
});

// @route GET api/account/verify
// @desc Verify user session token
// @access Public
router.get("/verify", (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.find(
    {
      _id: token,
      deleted: false
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Serever error"
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Invalid"
        });
      } else {
        return res.send({
          success: true,
          message: "Verified"
        });
      }
    }
  );
});

// @route GET api/account/logout
// @desc Delete user session token
// @access Public
router.get("/logout", (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      deleted: false
    },
    {
      $set: {
        deleted: true
      }
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Serever error"
        });
      }

      return res.send({
        success: true,
        message: "Logged out"
      });
    }
  );
});

module.exports = router;

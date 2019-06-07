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
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Email is required."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Password is required."
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server error"
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Account already exist."
        });
      }

      const newUser = new User();

      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        return res.send({
          success: true,
          message: "Signed up"
        });
      });
    }
  );
});

// @route POST api/account/signin
// @desc User signin form
// @access Public
router.post("/signin", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  email = email.toLowerCase();
  email = email.trim();

  if (!email) {
    return res.send({
      success: false,
      message: "Email is required."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Password is required."
    });
  }

  User.find({ email }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server error"
      });
    }

    if (users.length != 1) {
      return res.send({
        success: false,
        message: "Invalid"
      });
    }

    const user = users[0];
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: "Invalid"
      });
    }

    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: "Server error"
        });
      }

      return res.send({
        success: true,
        message: "Singed in",
        token: doc._id
      });
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

const express = require("express");
const router = express.Router();
const Pallete = require("../../models/Pallete");
const UserSession = require("../../models/UserSession");

// {
//   name: String,
//   author: String,
//   colors: [{hex: "#fff", order: 1}]
// }

// @route GET api/palletes/all
// @desc Get all palletes
// @access Public
router.get("/all", (req, res) => {
  Pallete.find()
    .sort({ date: -1 })
    .then(palletes => res.json(palletes));
});

// @route POST api/palletes/new
// @desc Create new pallete
// @access protected
router.post("/new", (req, res) => {
  const { name, author, colors } = req.body;
  const result = { success: false };

  if (!name) {
    result.message = "Pallete name is required.";
    return res.send(result);
  }

  if (!colors.length) {
    result.message = "No colors were specified.";
    return res.send(result);
  }

  const newPallete = new Pallete({
    name: name,
    author: author ? author : "By anonymouse"
  });

  colors.map(color => {
    newPallete.colors.push(color);
  });

  newPallete
    .save()
    .then(pallete => {
      result.success = true;
      result.message = "Pallete saved.";
      result.pallete = { id: pallete._id };
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      result.message = "Server Error.";
      res.send(result);
    });
});

// @route POST api/palletes/remove/:id
// @desc Remove a pallete
// @access protected
router.post("/delete", (req, res) => {
  const { palleteId, token } = req.body;
  const result = { success: false };

  if (!token) {
    result.message = "Access denied.";
    return res.send(result);
  }

  if (!palleteId) {
    result.message = "Pallete id is required.";
    return res.send(result);
  }

  UserSession.find(
    {
      _id: token,
      deleted: false
    },
    (err, sessions) => {
      if (!sessions || !sessions[0]) {
        result.message = "Access denied.";
        return res.send(result);
      }

      Pallete.findOneAndDelete({ _id: palleteId }, (err, doc) => {
        if (err) {
          result.message =
            err.name === "CastError" ? "Pallete not found" : "Server error.";
          return res.send(result);
        }

        if (!doc) {
          result.message = "Pallete not found";
          return res.send(result);
        }

        result.success = true;
        result.message = `Pallete with id '${doc._id}' was deleted`;
        return res.send(result);
      });
    }
  );

  // return res.status(200).end();

  // Pallete.findById(req.body.id).then(pallete => {
  //   pallete
  //     .remove()
  //     .then(() => res.json({ success: true }))
  //     .catch(error => res.status(404).json({ success: false }));
  // });
});

module.exports = router;

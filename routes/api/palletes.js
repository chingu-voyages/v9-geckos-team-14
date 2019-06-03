const express = require("express");
const router = express.Router();
const Pallete = require("../../models/Pallete");

// @route GET api/palletes
// @desc Get all palletes
// @access Public
router.get("/", (req, res) => {
  Pallete.find()
    .sort({ date: -1 })
    .then(palletes => res.json(palletes));
});

// @route POST api/palletes
// @desc Create a pallete
// @access Public
router.post("/", (req, res) => {
  const newPallete = new Pallete({ name: req.body.name });
  newPallete.save().then(pallete => res.json(pallete));
});

// @route DELETE api/palletes/:id
// @desc Delete a pallete
// @access Public
router.delete("/:id", (req, res) => {
  Pallete.findById(req.body.id).then(pallete => {
    pallete
      .remove()
      .then(() => res.json({ success: true }))
      .catch(error => res.status(404).json({ success: false }));
  });
});

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PalleteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pallete = mongoose.model("pallete", PalleteSchema);

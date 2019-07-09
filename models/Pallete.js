const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PalleteSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: "Anonymouse user"
    },
    colors: [
      {
        hex: String,
        order: Number
      }
    ],
    upvotes: Number
  },
  { timestamps: true }
);

module.exports = Pallete = mongoose.model("pallete", PalleteSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema(
  {
    userId: {
      type: String,
      default: ""
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserSession", UserSessionSchema);

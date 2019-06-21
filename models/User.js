const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      default: ""
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

UserSchema.methods.generateHash = function(password) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt, null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);

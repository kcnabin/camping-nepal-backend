const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

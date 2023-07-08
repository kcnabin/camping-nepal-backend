const { hashPassword } = require("../helper/hashPassword");
const bcrypt = require("bcrypt");
const decodeToken = require("../middleware/decodeToken");
const User = require("../model/User");

const changePassword = require("express").Router();

changePassword.put("/", decodeToken, async (req, res, next) => {
  const { id: userId } = req.decodedToken;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new Error("Invalid User!"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return next(new Error("Incorrect current password"));
    }

    const passwordHash = await hashPassword(newPassword);
    user.passwordHash = passwordHash;

    await user.save();
    res.json({
      msg: "Password changed!",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = changePassword;

const decodeToken = require("../middleware/decodeToken");
const User = require("../model/User");
const userInfo = require("express").Router();

userInfo.put("/update", decodeToken, async (req, res, next) => {
  const { id: userId } = req.decodedToken;

  const { name, phoneNum, address } = req.body;

  const newInfo = {
    fullName: name,
    phoneNum,
    address,
  };

  try {
    const updatedProfile = await User.findByIdAndUpdate(userId, newInfo, {
      new: true,
    });

    console.log("updatedProfile :", updatedProfile);

    res.end();
  } catch (error) {
    return next(error);
  }
});

userInfo.get("/", decodeToken, async (req, res, next) => {
  const userId = req.decodedToken.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new Error("User not found!"));
    }

    res.json({
      name: user.fullName,
      email: user.email,
      phoneNum: user.phoneNum,
      address: user.address,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userInfo;

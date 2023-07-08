require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const signup = require("./routes/signup");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const unknownEndpoint = require("./middleware/unknownEndpoint");
const login = require("./routes/login");
const places = require("./routes/places");
const uploadPhoto = require("./routes/uploadPhotoByLink");
const booking = require("./routes/booking");
const userBooking = require("./routes/userBooking");
const uploadFromDevice = require("./routes/uploadFromDevice");
const userInfo = require("./routes/userInfo");
const changePassword = require("./routes/changePassword");

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("--Connected to DB--");
  } catch (e) {
    console.log("--Error connecting to DB--");
    return;
  }
};
connectToDB();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/signup", signup);
app.use("/login", login);
app.use("/places", places);
app.use("/uploadPhoto", uploadPhoto);
app.use("/upload-from-device", uploadFromDevice);
app.use("/booking", booking);
app.use("/user-booking", userBooking);
app.use("/change-password", changePassword);

app.use("/user-info", userInfo);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5500;
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const Credentials = require("./middleware/Credentials");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(Credentials);
app.use(cors(corsOption));
// app.use(cors({origin: [
//     'http://localhost:3000',
//   ], credentials: true}))
// app.use(express.json())

app.use("/users", require("./routes/users"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyJWT);
app.use("/todolist", require("./routes/todolist"));

mongoose.connection.once("open", () => {
  console.log("connected to database");

  app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
  });
});

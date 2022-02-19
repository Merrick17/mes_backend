const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/mind-exploring").then(() => {
  console.log("connected...");
});

//routes
const userRouter = require("./routes/user.routes");

app.use("/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port);

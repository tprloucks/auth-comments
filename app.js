// bringin in express and morgan so we can see what request we are doing

const express = require("express");
const logger = require("morgan");
// using express/ calling express
const app = express();
// bringing in user router
const userRouter = require("./routes/user/userRouter");

app.use(logger("dev"));

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));
//  using our user router 
app.use("/api/user", userRouter);
// exporting our app.use 
module.exports = app;

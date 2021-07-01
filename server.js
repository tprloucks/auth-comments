
require("dotenv").config();
// bringing in needed dependecies
const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;
// connecting to mongoose to and showing we are connected
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);
  });

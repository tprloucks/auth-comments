
// bringing in needed dependecies and our user Model as well as BCRYPT
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const jwt = require("jsonwebtoken");
// start function 
async function signup(req, res) {
  // declaring our our object from Models
  const { username, email, password, firstName, lastName } = req.body;

  const { errorObj } = res.locals;
// saying if if there is nd error from error OBJ give a json message to let us know
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
// bring in salt and BCRYPT to hash our password
  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);
// declaring what is needed to create a new user and creating User
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
// saving created user
    let savedUser = await createdUser.save();
// message in json telling us user was created
    res.json({ message: "success", data: savedUser });
    // catching errors
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}
// login function
async function login(req, res) {
  // bringing data from body
  const { email, password } = req.body;
// declaring our user Obj
  const { errorObj } = res.locals;
// if there are errors let us know
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
// if no errors find the user email
  try {
    let foundUser = await User.findOne({ email: email });
    //if email is not found let user know
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
      // checking password validation
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
// if password not found in database let the user know 
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}
// exporting our module to be used in other files
module.exports = { signup, login };

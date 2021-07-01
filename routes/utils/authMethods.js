//  bringing in our functions again requiring our validator 
const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");
// checking our function for no input
const checkIsEmpty = (target) => (isEmpty(target) ? true : false);
// checking to make sure validations for password are good and strong
const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;
// checking email validation
const checkIsEmail = (email) => (isEmail(email) ? true : false);
// checking to make sure letters only
const checkIsAlpha = (target) => (isAlpha(target) ? true : false);
// checking to make sur alpha and numbers are there
const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);
// exporting validations before going to backend
module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};

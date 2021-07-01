// if input is empty let us know

function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Please fill out the form" });
  } else {
    let errorObj = {};
    res.locals.errorObj = errorObj;
    next();
  }
}
// export function
module.exports = checkIsUndefined;

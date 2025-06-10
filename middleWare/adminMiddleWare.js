const jwt = require("jsonwebtoken");

//localhost:9090/api/v1/auth/admin
async function adminMiddleWareController(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.status(404).send({ msg: err });
      } else {
        let { role } = decoded.userInfo;
        if (role === "admin") {
          next();
        } else {
          res.status(401).send({ msg: "access denied" });
        }
      }
    });
  } else {
    res.status(404).send({ Not_Found: "Cookie not found" });
  }
  next();
}

module.exports = adminMiddleWareController;

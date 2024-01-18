const jwtKey = process.env.db_url;
const Jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  var token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "logout" });
      } else {
        // console.log(token, "yoyoiii");
        next();
      }
    });
  } else {
    res.status(403).send({ result: "logout" });
  }
};

module.exports = verifyToken;

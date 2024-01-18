const express = require("express");
const router = express.Router();
const jwtKey = process.env.db_url;
const Jwt = require("jsonwebtoken");
const user = require("../db/user");

router.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let data = await user.findOne(req.body).select("-password");
    if (data) {
      Jwt.sign({ data }, jwtKey, { expiresIn: "4h" }, (err, token) => {
        if (err) {
          res.send({ data: "some error has occured" });
        }
        console.log(req.body);
        res.send({ data, auth: token });
      });
    } else {
      res.send({ result: "No user exist" });
    }
  } else {
    res.send({ result: "Please enter the required field" });
  }
});

router.post("/signup", async (req, res) => {
  console.log("it is reaching upto the backend");
  let data = new user(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "4h" }, (err, token) => {
    if (err) {
      res.send({ result: "some error has occured" });
    }
    res.send({ result, auth: token });
  });
});
module.exports = router;

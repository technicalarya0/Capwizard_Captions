const caption = require("../db/caption");
const jwtKey = process.env.db_url;
const Jwt = require("jsonwebtoken");
const user = require("../db/user");

const getCaption = async (req, res) => {
  // console.log(req);
  const data = await caption.find();
  // console.log(data + "hjnj");
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "no data found" });
  }
};

const getVerified = async (req, res) => {
  res.send({ result: "verified" });
};

const postCaption = async (req, res) => {
  let data = new caption(req.body);
  let result = await data.save();
  result = result.toObject();
  res.send(result);
};

const deleteCaption = async (req, res) => {
  //   console.log("delete api called");
  id = req.params.id;
  let data = await caption.deleteOne({ _id: id });
  res.status(200).send(data);
};

const updateCaption = async (req, res) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
};

const searchCaption = async (req, res) => {
  let result = await caption.find({
    $or: [
      { name: { $regex: req.params.key } },
      { platform: { $regex: req.params.key } },
      { mood: { $regex: req.params.key } },
      { length: { $regex: req.params.key } },
      { caption: { $regex: req.params.key } },
    ],
  });
  res.send(result);
};
module.exports = {
  getCaption,
  getVerified,
  postCaption,
  deleteCaption,
  updateCaption,
  searchCaption,
};

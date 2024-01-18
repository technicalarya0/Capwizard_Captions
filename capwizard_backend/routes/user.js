const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getCaption,
  getVerified,
  postCaption,
  deleteCaption,
  updateCaption,
  searchCaption,
} = require("../controllers/people");

router.post("/addproduct", verifyToken, postCaption);

router.get("/getcaptions", verifyToken, getCaption);

router.get("/verify", verifyToken, getVerified);

// router.get("/product/:id", verifyToken, async (req, res) => {
//   let result = await product.findOne({ _id: req.params.id });
//   if (result) {
//     res.send(result);
//   } else {
//     res.send({ result: "nothing found" });
//   }
// });

router.delete("/deletecaption/:id", verifyToken, deleteCaption);

router.put("/update/:id", verifyToken, updateCaption);

router.get("/search/:key", verifyToken, searchCaption);

module.exports = router;

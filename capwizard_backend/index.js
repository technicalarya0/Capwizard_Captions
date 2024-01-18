require("./db/config");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 5000;

const auth = require("./routes/auth");
const people = require("./routes/user");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", auth);
app.use("/user", people);

// const connectdb = async () => {
//   console.log(user);
//   const data = await user.find();
//   console.log(data);
// };

app.listen(port, () => console.log(`app is runninig on port ${port}....`));

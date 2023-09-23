const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.json("hello world");
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "ok" });
});

router.get("/time", (req, res) => {
  res.status(200).json({ message: moment().format() });
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ok`));

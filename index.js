const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.json("hello world");
});

router.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "ok" });
});

router.get("/time", (req, res) => {
  res.status(200).json({ status: 200, message: moment().format() });
});

router.get("/hello/:id", (req, res) => {
  res.status(200).json({ status: 200, message: "Hello, " + req.params.id });
});

router.get("/hello", (req, res) => {
  res.status(200).json({ status: 200, message: "Hello" });
});

router.get("/search", (req, res) => {
  const search = req.query.s;
  if (search) {
    res.status(200).json({ status: 200, message: "ok", data: search });
  } else {
    res.status(500).json({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ok`));

const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

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

// create
// router.post("/movies/create", (req, res) => {
//   console.log("crated");
// });

// return all movies
router.get("/movies/read", (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});

//update
// router.put("/movies/update/:id", (req, res) => {
//   console.log("updated");
// });

// delete
// router.delete("/movies/delete/:id", (req, res) => {
//   console.log("deleted");
// });

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ok`));

const express = require("express");
const moment = require("moment");
const router = express.Router();
const app = express();
const Movie = require("./mongo");

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

// crud using http verbs(post, get, put, delete)
// create
router.post("/movies/add", (req, res) => {
  let title, year, rating;
  if (req.query.title) {
    title = req.query.title;
  } else {
    res.status(403).json({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title",
    });
  }
  if (
    req.query.year &&
    req.query.year.length == 4 &&
    !isNaN(parseInt(req.query.year))
  ) {
    year = parseInt(req.query.year);
  } else {
    res.status(403).json({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a year",
    });
  }
  if (req.query.rating && !isNaN(parseInt(req.query.rating))) {
    rating = parseInt(req.query.rating);
  } else {
    rating = 4;
  }
  if (title && year && rating) {
    // Movie.Movie.insertMany({ title, year, rating })
    // .then((movies) => {
    //   res.json(movies);
    // })
    // .catch((err) => {
    //   res.json(err);
    // });
    movies.push({ title: title, year: year, rating: rating });
    res.status(200).json({ status: 200, message: movies });
  }
});

// return all movies
router.get("/movies/read", (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});

// return one movie
router.get("/movies/read/id/:id", (req, res) => {
  if (parseInt(req.params.id) <= 0 || parseInt(req.params.id) > movies.length) {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${req.params.id} does not exist`,
    });
  } else {
    res
      .status(200)
      .json({ status: 200, message: movies[parseInt(req.params.id) - 1] });
  }
});

//update
router.put("/movies/update/:id", (req, res) => {
  let id = req.params.id;
  if (id > 0 && id <= movies.length) {
    if (
      req.query.year &&
      req.query.year.length == 4 &&
      !isNaN(parseInt(req.query.year))
    )
      req.query.year = parseInt(req.query.year);
    else {
      req.query.year = movies[id].year;
    }
    if (req.query.rating && !isNaN(parseInt(req.query.rating)))
      req.query.rating = parseInt(req.query.rating);
    else {
      req.query.rating = movies[id].rating;
    }
    movies[id] = { ...movies[id], ...req.query };
    res.status(200).json({ status: 200, message: movies });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${id} does not exit`,
    });
  }
});

// delete
router.delete("/movies/delete/:id", (req, res) => {
  if (req.params.id > 0 && req.params.id <= movies.length) {
    movies.splice(parseInt(req.params.id) - 1, 1);
    res.status(200).json({ status: 200, message: movies });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${req.params.id} does not exist`,
    });
  }
});

router.get("/movies/read/by-date", (req, res) => {
  movies.sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: movies });
});

router.get("/movies/read/by-rating", (req, res) => {
  movies.sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: movies });
});

router.get("/movies/read/by-title", (req, res) => {
  movies.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: movies });
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ok`));

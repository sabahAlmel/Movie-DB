const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: Number,
});
const Movie = mongoose.model("Movie", schema);
module.exports = Movie;
